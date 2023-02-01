import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { Card, Col, Form, Row, Typography, message } from 'antd';
import React, { useCallback } from 'react';
import { DiaryEditor } from './DiaryEditor';
import { DiaryHistory } from './DiaryHistory';

export interface DiaryFormData {
  content: string;
}

export const DiaryPage = () => {
  const [form] = Form.useForm<DiaryFormData>();

  const onFinish = useCallback(({ content }: DiaryFormData) => {
    message.success('记录成功 ' + content);
    form.resetFields();
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
