import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
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

  const onFinish = useCallback(({ content: rawContent }: DiaryFormData) => {
    const { parsed, unparsed } = parseDailyRecord(rawContent);
    const successDetail = <Col span={24}>记录解析成功 {parsed.length} 条</Col>;
    const failureDetail = (
      <div>
        解析失败{unparsed.length}条：
        {unparsed.map((item) => {
          return <Row>{item}</Row>;
        })}
        可更正后再试。
      </div>
    );
    const content = (
      <Row>
        {successDetail}
        {unparsed.length ? failureDetail : undefined}
      </Row>
    );
    Modal.confirm({
      title: '确认解析结果',
      content,
      async onOk() {
        try {
          // TODO call api here
          message.success('记录成功');
          form.resetFields();
        } catch (error) {
          message.error('记录失败，请联系管理员');
        }
      },
    });
  }, []);

  return (
    <StandardPageLayout title="日拱一卒" subTitle="功不唐捐">
      <Row gutter={[8, 8]}>
        <Col xl={6} xs={24}>
          <Card>
            <Typography.Title level={5}>今日打卡</Typography.Title>
            <Form<DiaryFormData> form={form} onFinish={onFinish}>
              <DiaryEditor></DiaryEditor>
            </Form>
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          <DiaryHistory></DiaryHistory>
        </Col>
      </Row>
    </StandardPageLayout>
  );
};
