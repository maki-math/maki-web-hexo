import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { TagsDisplay } from '@/components/Standard/TagsDisplay';
import { QuestionModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Button, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { default as React, FC } from 'react';
import { Link, Route } from 'react-router-dom';
import { ProblemEditingPage } from './ProblemEditingPage';

export function QuestionList() {
  const { data, loading } = useRequest(api.question.questionList);
  const courses = data?.data;

  const columns = [
    {
      title: '习题名',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: QuestionModel) => {
        const path = {
          pathname: '/problems/' + row.id,
          state: { title: title },
        };
        return <Link to={path}>{title}</Link>;
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string) => {
        return <TagsDisplay tags={tags}></TagsDisplay>;
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
  ];

  return <Table columns={columns} dataSource={courses} loading={loading} />;
}

export const ProblemsPage: FC<unknown> = () => {
  return (
    <>
      <Route path="/problems" exact>
        <StandardPageLayout title="题目列表">
          <Link to="/problems/edit">
            <Button type="primary">添加题目</Button>
          </Link>
          <Content>
            <QuestionList></QuestionList>
          </Content>
        </StandardPageLayout>
      </Route>
      <Route path="/problems/edit">
        <ProblemEditingPage></ProblemEditingPage>
      </Route>
      <Route
        path="/problems/:id"
        render={(props) => {
          return (
            <StandardPageLayout title="题目内容">
              <Content>id: {props.match.params.id}</Content>
            </StandardPageLayout>
          );
        }}
      ></Route>
    </>
  );
};
