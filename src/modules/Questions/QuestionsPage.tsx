import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { TagsDisplay } from '@/components/Standard/TagsDisplay';
import { QuestionModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Button, Col, Row, Table, message, Popconfirm, Space } from 'antd';
import { default as React, FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { QuestionSetNodeEditingPage } from './QuestionSetNodeEditingPage';
import { QuestionEditingPage } from './QuestionEditingPage';
import { QuestionDetailPage } from './QuestionDetailPage';
import moment from 'moment';

export function QuestionList() {
  const { data, loading, refresh } = useRequest(api.question.questionList);
  const questions = data?.data;

  const deleteQuestion = (question: QuestionModel) => {
     api.question.questionDestroy(question.id)
      .then((res) => {
        message.success("删除成功");
        refresh();
      })
      .catch((err) => {
        message.error("删除失败, 请稍后重试.");
      });
  };
  const { run } = useRequest(deleteQuestion, { manual: true });

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
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, row: QuestionModel) => {
        const path = {
          pathname: '/questions/edit/' + id,
        };
        return (
          <Space>
            <Link to={path}>编辑</Link>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => run(row)}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
        </Space>);
      },
    }
  ];

  return (
    <StandardPageLayout
      title="题目列表"
      subTitle={<Link to="/questions/sets">查看习题集列表</Link>}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Link to="/questions/edit">
            <Button type="primary">添加题目</Button>
          </Link>
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={questions} loading={loading} />
        </Col>
      </Row>
    </StandardPageLayout>
  )
}

export function QuestionSetList() {
  return (
    <StandardPageLayout
      title="习题集列表"
      subTitle={<Link to="/questions">查看题目列表</Link>}
    >
      <QuestionSetNodeEditingPage></QuestionSetNodeEditingPage>
    </StandardPageLayout>
  )
}

export function QuestionSetDetail({id}: {id: string}) {
  return (
    <StandardPageLayout title={"习题集详情"}>
      <QuestionSetNodeEditingPage
        questionNodeId={id}
      ></QuestionSetNodeEditingPage>
     </StandardPageLayout>
  )
}

export const QuestionsPage: FC<unknown> = () => {
  return (
    <Switch>
      <Route path="/questions" exact>
        <QuestionList></QuestionList>
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
          <QuestionSetList></QuestionSetList>
        </Route>
        <Route
          path="/questions/sets/:id"
          render={(props) => {
            return (
              <QuestionSetDetail 
                id={Number(props.match.params.id)}
              ></QuestionSetDetail>
            );
          }}
        ></Route>
      </Route>
      <Route
        path="/questions/:id"
        render={(props) => {
          return (
            <QuestionDetailPage 
              id={props.match.params.id} 
            ></QuestionDetailPage>
          );
        }}
      ></Route>
    </Switch>
  );
};
