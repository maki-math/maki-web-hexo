import { Card, Col, Row, Space } from 'antd';
import React from 'react';

export function Banner() {
  return (
    <Card bodyStyle={{ height: '300px' }}>
      <Row justify="end" className="h-full" align="middle">
        <Col pull={4}>
          <Space direction="vertical" align="center">
            <h1>欢迎来到Maki's Lab</h1>
            <h3>一个Maki和朋友们的有趣小窝</h3>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
