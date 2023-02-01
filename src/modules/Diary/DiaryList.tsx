import { useRequest } from 'ahooks';
import { Empty, List, Skeleton } from 'antd';
import React from 'react';
import { DiaryItem, diary, humanizeTimeString } from './api/diary';
import { formatDailyRecords } from './debug';

interface Props {
  onCopy?: (x: DiaryItem) => void;
}

export const DiaryList = ({ onCopy }: Props) => {
  const userId = 0;
  const { data: list, loading } = useRequest(
    async () => {
      if (userId) {
        return diary.queryList({
          timeRange: 'week',
          wechatInternalId: undefined,
          userId: 1,
        });
      }
      return undefined;
    },
    {
      refreshDeps: [userId],
    }
  );
  return (
    <Skeleton loading={loading}>
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={false}
        locale={{ emptyText: <Empty description="此功能正在开发中~"></Empty> }}
        dataSource={list}
        renderItem={(item) => {
          const time = humanizeTimeString(item.updatedAt);
          const content = formatDailyRecords(item.items);
          return (
            <List.Item
              actions={[
                <a key="copy" onClick={() => onCopy?.(item)}>
                  复制
                </a>,
              ]}
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
