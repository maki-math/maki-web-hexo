import { Card, Row } from 'antd';
import React from 'react';
const Text = `"九万里风鹏正举。风休住，蓬舟吹取三山去。" ——  【宋】 李清照`;
export function DailyWord() {
  return (
    <Card bodyStyle={{ height: '100px' }}>
      <Row className="h-full" justify="center" align="middle">
        <img
          src="/src/assets/idea.png"
          alt=""
          height={60}
          style={{ marginRight: '20px' }}
        />
        {Text}
      </Row>
    </Card>
  );
}
