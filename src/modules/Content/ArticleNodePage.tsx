import { useRequest } from 'ahooks';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useState } from 'react';
import { findInTreeById, getArticleNodeRoot, renderMenu } from './ContentPage';
import { ArticleDisplay } from './PostDisplay/PostDisplay';

export interface Props {
  articleId: number;
  articleNodeId: number;
}

export function ArticleNodePage({ articleNodeId, articleId }: Props) {
  const { data, loading, error } = useRequest(
    () => {
      return getArticleNodeRoot(articleNodeId);
    },
    { refreshDeps: [articleNodeId] }
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    String(articleNodeId),
  ]);
  return (
    <Layout hasSider>
      <Sider
        style={{
          width: 200,
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 88,
          bottom: 0,
        }}
      >
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys={selectedKeys}
          onSelect={({ key, keyPath }) => {
            setSelectedKeys([key]);
            const targetContentNode = findInTreeById(data?.root, key);
          }}
        >
          {
            <SubMenu
              key={String(data?.root?.id)}
              title={<span>{data?.root?.label}</span>}
            >
              {renderMenu(data?.root)}
            </SubMenu>
          }
        </Menu>
      </Sider>
      <Layout className="h-full" style={{ padding: '24px 0', marginLeft: 150 }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <ArticleDisplay articleId={String(articleId)}></ArticleDisplay>
        </Content>
      </Layout>
    </Layout>
  );
}
