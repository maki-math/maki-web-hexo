import { ContentNodeModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { ArticleDisplay } from './PostDisplay/PostDisplay';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export interface Props {
  id: number;
}

export const findInTreeById = (
  root: ContentNodeModel,
  id: number
): ContentNodeModel | undefined => {
  if (root.id === id) {
    return root;
  }
  for (const child of root?.children ?? []) {
    const result = findInTreeById(child, id);
    if (result) {
      return result;
    }
  }
};

export const getArticleNodeRoot = async (articleNodeId: number) => {
  const res = await api.articleNode.articleNodeRootRetrieve(articleNodeId);
  return {
    root: res.data,
    currentNode: findInTreeById(res.data, articleNodeId)!,
  };
};

// recursively render menu
export const renderMenu = (root: ContentNodeModel | undefined) => {
  if (root) {
    return root?.children.map((child) => {
      if (child.children.length) {
        return (
          <SubMenu key={String(child.id)} title={<span>{child.label}</span>}>
            {renderMenu(child)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={String(child.id)}>
          <span>{child.label}</span>
        </Menu.Item>
      );
    });
  }
  return <></>;
};

export function ArticlePage({ id }: Props) {
  const { data, loading, error } = useRequest(
    () => {
      return getArticleNodeRoot(id);
    },
    { refreshDeps: [id] }
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>([String(id)]);
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
          <ArticleDisplay articleId={id}></ArticleDisplay>
        </Content>
      </Layout>
    </Layout>
  );
}
