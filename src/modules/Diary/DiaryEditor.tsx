import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';

const { TextArea } = Input;

const placeholder = `学习数学分析课程：1页`;

export const DiaryEditor = () => {
  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="content"
          rules={[{ required: true, message: '请填写打卡内容' }]}
        >
          <TextArea
            rows={10}
            spellCheck={false}
            placeholder={placeholder}
          ></TextArea>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Row justify="end">
          <Space>
            <Form.Item noStyle>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Form.Item>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};
