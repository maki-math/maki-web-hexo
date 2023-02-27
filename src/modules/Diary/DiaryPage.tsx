import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { api } from '@/utils/api';
import { useIsLoggedIn } from '@/utils/auth-token';
import { useCounter } from 'ahooks';
import { Card, Col, Form, Modal, Row, Typography, message } from 'antd';
import React, { useCallback } from 'react';
import { DiaryEditor } from './DiaryEditor';
import { DiaryHistory } from './DiaryHistory';
import { parseDailyRecord } from './util/daily-record-parser';

export interface DiaryFormData {
  content: string;
}

export const DiaryPage = () => {
  const [form] = Form.useForm<DiaryFormData>();

  const { isLoggedIn, payload: loginPayload } = useIsLoggedIn();
  const currentUserId = loginPayload?.data.pk;

  const [shouldRefreshHistory, { inc: refreshHistory }] = useCounter();

  const onFinish = useCallback(
    ({ content: rawContent }: DiaryFormData) => {
      if (!currentUserId) {
        message.error('当前用户未登录，请登录后再打卡');
        return;
      }
      const { parsed, unparsed } = parseDailyRecord(rawContent);
      const successDetail = <Col span={24}>解析成功 {parsed.length} 条</Col>;
      const failureDetail = (
        <div>
          解析失败{unparsed.length}条：
          {unparsed.map((item) => {
            return <Row>{item}</Row>;
          })}
        </div>
      );
      const modalContent = (
        <Row>
          {successDetail}
          {unparsed.length ? failureDetail : undefined}
        </Row>
      );
      if (parsed.length) {
        Modal.confirm({
          title: '是否提交解析成功的条目',
          content: modalContent,
          async onOk() {
            try {
              const userProfile = await api.userProfile.userProfileCurrentRetrieve();
              await api.diary.diaryCreate({
                author: { id: userProfile.data.id },
                items: parsed,
              } as any);
              message.success('记录成功');
              form.resetFields();
              refreshHistory();
            } catch (error) {
              message.error('记录失败，请联系管理员');
            }
          },
        });
      } else {
        Modal.error({
          title: '没有可解析的内容',
          content: failureDetail,
        });
      }
    },
    [currentUserId]
  );

  return (
    <StandardPageLayout title="日拱一卒" subTitle="功不唐捐">
      <Row gutter={[8, 8]}>
        <Col xl={6} xs={24}>
          <Card>
            <Typography.Title level={5}>今日打卡</Typography.Title>
            <Form<DiaryFormData>
              form={form}
              onFinish={onFinish}
              disabled={!isLoggedIn}
            >
              <DiaryEditor></DiaryEditor>
            </Form>
          </Card>
        </Col>
        <Col xl={18} xs={24} style={isLoggedIn ? {} : { display: 'none' }}>
          <DiaryHistory shouldRefresh={shouldRefreshHistory}></DiaryHistory>
        </Col>
      </Row>
    </StandardPageLayout>
  );
};
