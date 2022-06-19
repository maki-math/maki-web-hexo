import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { TagsDisplay } from '@/components/Standard/TagsDisplay';
import { QuestionModel, QuestionSetNodeModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Button, Col, Row, Space, Table } from 'antd';
import { default as React, FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { QuestionEditingPage } from './QuestionEditingPage';
import { QuestionSetNodeEditingPage } from './QuestionSetNodeEditingPage';
import { QuestionDetailPage } from './QuestionDetailPage';
import moment from 'moment';
import { AuthModuleEnum, useAuth, useIsLoggedIn } from '@/utils/auth-token';
import { isNotNil } from '@/utils/types';

export function QuestionList() {
  const { data, loading } = useRequest(api.question.questionList);
  const questions = data?.data;

  const isAuthed = useAuth(AuthModuleEnum.QuestionPage);

  const columns = [
    {
      title: '习题名',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: QuestionModel) => {
        const path = {
          pathname: '/questions/' + row.id,
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
      render: (date: string) => {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>;
      },
    },
    isAuthed
      ? {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          render: (id: number) => {
            const path = {
              pathname: '/questions/edit/' + id,
            };
            return (
              <Space>
                <Link to={path}>编辑</Link>
              </Space>
            );
          },
        }
      : null,
  ].filter(isNotNil);

  return <Table columns={columns} dataSource={questions} loading={loading} />;
}

export function QuestionSetList() {
  const { data, loading } = useRequest(api.questionSet.questionSetList);
  const questionSet = data?.data;

  const columns = [
    {
      title: '习题集名',
      dataIndex: 'label',
      key: 'label',
      render: (label: string, row: QuestionSetNodeModel) => {
        const path = {
          pathname: '/questions/sets/' + row.id,
        };
        return <Link to={path}>{label}</Link>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={questionSet}
      loading={loading}
      rowKey="id"
      expandable={{ childrenColumnName: 'N/A' }}
    />
  );
}

export const QuestionsPage: FC<unknown> = () => {
  const isAuthed = useAuth(AuthModuleEnum.QuestionPage);
  return (
    <Switch>
      <Route path="/questions" exact>
        <StandardPageLayout
          title="题目列表"
          subTitle={<Link to="/questions/sets">查看习题集列表</Link>}
        >
          <Row gutter={[8, 8]}>
            {isAuthed && (
              <Col span={24}>
                <Link to="/questions/edit">
                  <Button type="primary">添加题目</Button>
                </Link>
              </Col>
            )}
            <Col span={24}>
              <QuestionList></QuestionList>
            </Col>
          </Row>
        </StandardPageLayout>
      </Route>
      <Route path="/questions/edit" exact>
        <QuestionEditingPage id={0}></QuestionEditingPage>
      </Route>
      <Route
        path="/questions/edit/:id"
        render={(props) => {
          return (
            <QuestionEditingPage
              id={Number(props.match.params.id)}
            ></QuestionEditingPage>
          );
        }}
      ></Route>
      <Route path="/questions/sets">
        <Route path="/questions/sets" exact>
          <StandardPageLayout
            title="习题集列表"
            subTitle={<Link to="/questions">查看题目列表</Link>}
          >
            <QuestionSetList></QuestionSetList>
          </StandardPageLayout>
        </Route>
        <Route
          path="/questions/sets/:id"
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
        path="/questions/:id"
        render={(props) => {
          return (
            <QuestionDetailPage id={props.match.params.id}></QuestionDetailPage>
          );
        }}
      ></Route>
    </Switch>
  );
};
