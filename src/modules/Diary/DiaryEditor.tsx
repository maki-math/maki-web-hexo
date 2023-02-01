import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';

const { TextArea } = Input;

export const DiaryEditor = () => {
  return (
    <Row>
      <Col span={24}>
        <Form.Item name="content">
          <TextArea rows={10} spellCheck={false}></TextArea>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Row justify="end">
          <Space>
            <Form.Item noStyle>
              <Button htmlType="submit" type="primary" disabled>
                提交
              </Button>
            </Form.Item>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};
