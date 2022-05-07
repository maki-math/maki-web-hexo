import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { api } from '@/utils/api';
import { QuestionSetNodeModel } from '@/generated-api/Api';
import { useRequest } from 'ahooks';
import { Spin, Table } from 'antd';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';

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

  var questionSet = data?.data;
  questionSet = questionSet?.id ? [questionSet] : questionSet;

  const columns = [
    {
      title: '习题集名',
      dataIndex: 'label',
      key: 'label',
      render: (label: string, row: QuestionSetNodeModel) => {
        const path = {
          pathname: `/questions/${row?.question}`,
        }
        return row.children?.[0] ? <span>{label}</span> : <Link to={path}>{label}</Link>
      },
    }
  ];
  return (
    <StandardPageLayout title={"习题集详情"}>
      <Table
        columns={columns}
        dataSource={questionSet}
        loading={loading}
        rowKey="id"
      />
    </StandardPageLayout>
  );
}
