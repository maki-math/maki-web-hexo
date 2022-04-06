import { ArticleModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { StandardPageLayout } from '../../components/Standard/StandardPageLayout';
import { ContentPage } from './ContentPage';

function ArticleList() {
  const { data, loading } = useRequest(api.article.listArticles);
  const articleList = data?.data;

  const columns = [
    {
      title: '文章名称',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: ArticleModel) => {
        const path = {
          pathname: '/content/' + row.id,
        };
        return <Link to={path}>{title}</Link>;
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
  ];

  return <Table columns={columns} dataSource={articleList} loading={loading} />;
}

export function ArticleListPage() {
  const { url } = useRouteMatch();
  return (
    <>
      <Route path={`${url}/`} exact>
        <StandardPageLayout title="文章列表">
          <ArticleList></ArticleList>
        </StandardPageLayout>
      </Route>
      <Route
        path={`${url}/:id`}
        render={(param) => {
          return <ContentPage id={Number(param.match.params.id)}></ContentPage>;
        }}
      ></Route>
    </>
  );
}
