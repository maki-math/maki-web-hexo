import { useRequest } from 'ahooks';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { findInTreeById, getArticleNodeRoot, renderMenu } from './ContentPage';
import { ArticleDisplay } from './PostDisplay/PostDisplay';

export interface Props {
  articleId: number;
  articleNodeId: number;
}

export function buildArticleNodeUrl({
  articleId,
  articleNodeId,
}: {
  articleId: number;
  articleNodeId: number;
}) {
  return `/content/${articleId}/articleNode/${articleNodeId}`;
}

export function ArticleNodePage({ articleNodeId, articleId }: Props) {
  const { data } = useRequest(
    () => {
      return getArticleNodeRoot(articleNodeId);
    },
    { refreshDeps: [articleNodeId] }
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    String(articleNodeId),
  ]);

  const history = useHistory();

  return (
    <Layout hasSider>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys={selectedKeys}
          onSelect={({ key }) => {
            setSelectedKeys([key]);
            const targetContentNode = findInTreeById(data?.root, key);
            history.push(
              buildArticleNodeUrl({
                articleId: targetContentNode?.article.id,
                articleNodeId: targetContentNode?.id,
              })
            );
          }}
        >
          <SubMenu
            key={String(data?.root?.id)}
            title={<span>{data?.root?.label}</span>}
          >
            {renderMenu(data?.root)}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <ArticleDisplay articleId={String(articleId)}></ArticleDisplay>
        </Content>
      </Layout>
    </Layout>
  );
}
