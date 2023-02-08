import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Empty, List, Skeleton } from 'antd';
import React from 'react';
import { DailyRecordType, DiaryItem, humanizeTimeString } from './api/diary';
import { formatDailyRecords } from './debug';

interface Props {
  onCopy?: (x: DiaryItem) => void;
  shouldRefresh?: number;
}

export const DiaryList = ({ shouldRefresh }: Props) => {
  const { data, loading } = useRequest(
    async () => {
      return api.diary.diaryList({ span_literal: 'week' });
    },
    { refreshDeps: [shouldRefresh] }
  );
  const list = data?.data;
  return (
    <Skeleton loading={loading}>
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={false}
        locale={{ emptyText: <Empty description="暂无本周打卡记录"></Empty> }}
        dataSource={list}
        renderItem={(item) => {
          const time = humanizeTimeString(item.updatedAt);
          const content = formatDailyRecords(item.items as DailyRecordType[]);
          return (
            <List.Item
            // TODO enable this
            // actions={[
            //   <a key="copy" onClick={() => onCopy?.(item as DiaryItem)}>
            //     复制
            //   </a>,
            // ]}
            >
              <List.Item.Meta
                title={<span>{item.author.user.username}</span>}
                description={time}
              />
              <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
            </List.Item>
          );
        }}
      />
    </Skeleton>
  );
};
