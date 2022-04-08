import { ContentNodeModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { StandardPageLayout } from '../../components/Standard/StandardPageLayout';
import { ArticlePage } from './ContentPage';

/**
 * 主要为了debug用的文章节点列表
 */
function ArticleNodeList() {
  const { data, loading } = useRequest(api.articleNode.articleNodeList);
  const dataList = data?.data;

  const columns = [
    {
      title: '文章名称',
      dataIndex: 'label',
      key: 'label',
      render: (label: string, row: ContentNodeModel) => {
        const path = {
          pathname: `/content/${row.article.id}`,
        };
        return <Link to={path}>{label}</Link>;
      },
    },
    {
      title: '作者',
      dataIndex: 'article.author',
      key: 'article.author',
      render: (__ignored: unknown, row: ContentNodeModel) => {
        return row.article.author;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataList}
      loading={loading}
      rowKey="id"
    />
  );
}

export function ArticleListPage() {
  const { url } = useRouteMatch();
  return (
    <>
      <Route path={`${url}/`} exact>
        <StandardPageLayout title="文章列表">
          <ArticleNodeList></ArticleNodeList>
        </StandardPageLayout>
      </Route>
      <Route
        path={`${url}/:id`}
        render={(param) => {
          return <ArticlePage id={param.match.params.id}></ArticlePage>;
        }}
      ></Route>
    </>
  );
}
