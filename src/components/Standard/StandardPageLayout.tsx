import { BackToHome } from '@/modules/App/components/BackToHome';
import { Layout, PageHeader } from 'antd';
const { Content } = Layout;
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  back?: boolean;
}

const goBack = () => {
  window.history.back();
};

export function StandardPageLayout({ subTitle, title, children, back }: Props) {
  return (
    <div className="min-h-100vh">
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <PageHeader
            ghost={false}
            title={title}
            className="h-full"
            subTitle={subTitle}
            onBack={back ? goBack : undefined}
          >
            <Content>{children}</Content>
          </PageHeader>
        </Content>
      </Layout>
    </div>
  );
}
