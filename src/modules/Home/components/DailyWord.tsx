import { Card, Row } from 'antd';
import React from 'react';
import IdeaPng from '@/assets/idea.png';
const Text = `"九万里风鹏正举。风休住，蓬舟吹取三山去。" ——  【宋】 李清照`;
export function DailyWord() {
  return (
    <Card>
      <Row className="h-full" justify="center" align="middle">
        <img src={IdeaPng} alt="" height={60} style={{ marginRight: '20px' }} />
        {Text}
      </Row>
    </Card>
  );
}
