import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { TagsDisplay } from '@/components/Standard/TagsDisplay';
import { QuestionModel, QuestionSetNodeModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Button, Col, Row, Table } from 'antd';
import { default as React, FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { QuestionEditingPage } from './QuestionEditingPage';
import { QuestionSetNodeEditingPage } from './QuestionSetNodeEditingPage';

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

export function QuestionSetList() {
  const { data, loading } = useRequest(api.questionSet.questionSetList);
  const courses = data?.data;

  const columns = [
    {
      title: '习题集名',
      dataIndex: 'label',
      key: 'label',
      render: (label: string, row: QuestionSetNodeModel) => {
        const path = {
          pathname: '/problems/sets/' + row.id,
        };
        return <Link to={path}>{label}</Link>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses}
      loading={loading}
      rowKey="id"
      expandable={{ childrenColumnName: 'N/A' }}
    />
  );
}

export const QuestionsPage: FC<unknown> = () => {
  return (
    <Switch>
      <Route path="/problems" exact>
        <StandardPageLayout
          title="题目列表"
          subTitle={<Link to="/problems/sets">查看习题集列表</Link>}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Link to="/problems/edit">
                <Button type="primary">添加题目</Button>
              </Link>
            </Col>
            <Col span={24}>
              <QuestionList></QuestionList>
            </Col>
          </Row>
        </StandardPageLayout>
      </Route>
      <Route path="/problems/edit">
        <QuestionEditingPage></QuestionEditingPage>
      </Route>
      <Route path="/problems/sets">
        <Route path="/problems/sets" exact>
          <StandardPageLayout
            title="习题集列表"
            subTitle={<Link to="/problems">查看题目列表</Link>}
          >
            <QuestionSetList></QuestionSetList>
          </StandardPageLayout>
        </Route>
        <Route
          path="/problems/sets/:id"
          render={(props) => {
            return (
              <QuestionSetNodeEditingPage
                questionNodeId={Number(props.match.params.id)}
              ></QuestionSetNodeEditingPage>
            );
          }}
        ></Route>
      </Route>
      <Route
        path="/problems/:id"
        render={(props) => {
          return (
            <StandardPageLayout title="题目内容">
              id: {props.match.params.id}
            </StandardPageLayout>
          );
        }}
      ></Route>
    </Switch>
  );
};
