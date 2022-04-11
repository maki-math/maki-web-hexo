import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React from 'react';

interface Props {
  questionNodeId: number;
}

export function QuestionSetNodeEditingPage({ questionNodeId }: Props) {
  const { data, loading } = useRequest(
    () => {
      return api.questionSet.questionSetRetrieve(questionNodeId);
    },
    { refreshDeps: [questionNodeId] }
  );

  const dataSource = data?.data;

  return (
    <StandardPageLayout title="习题集详情">
      {/* TODO 实现习题集详情展示 */}
      id: {questionNodeId}
      <Spin spinning={loading}>{JSON.stringify(dataSource)}</Spin>
    </StandardPageLayout>
  );
}
