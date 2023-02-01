import { Card, Space, Typography } from 'antd';
import React from 'react';
import { DiaryList } from './DiaryList';
import { DiaryItem } from './api/diary';

interface Props {
  onSelectDiary?: (x: DiaryItem) => void;
}

export const DiaryHistory = ({ onSelectDiary }: Props) => {
  return (
    <Card>
      <Space>
        <Typography.Title level={5} style={{ display: 'inline' }}>
          本周打卡记录
        </Typography.Title>
        <Typography.Text type="secondary">
          暂时只支持查询本周的打卡记录
        </Typography.Text>
      </Space>
      <DiaryList onCopy={onSelectDiary}></DiaryList>
    </Card>
  );
};
