import styled from '@emotion/styled';
import { Layout, PageHeader } from 'antd';
import React from 'react';
const { Content } = Layout;

export interface Props {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  back?: boolean;
}

const goBack = () => {
  window.history.back();
};

const StyledPage = styled.div`
  padding: 0 30px;
  @media (max-width: 600px) {
    padding: 0 !important;
  }
  .content-container {
    min-height: 280px;
    padding: 0 24px;
    @media (max-width: 600px) {
      padding: 0;
    }
  }
`;

export function StandardPageLayout({ subTitle, title, children, back }: Props) {
  return (
    <StyledPage className="min-h-100vh">
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Content className="content-container">
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
    </StyledPage>
  );
}
