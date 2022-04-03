import { Layout, PageHeader } from 'antd';
const { Content } = Layout;
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  title?: string;
}

export function StandardPageLayout(props: Props) {
  return (
    <div className="h-100vh">
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <PageHeader ghost={false} title={props.title} className="h-full">
            <Content>{props.children}</Content>
          </PageHeader>
        </Content>
      </Layout>
    </div>
  );
}
