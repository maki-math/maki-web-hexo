import { StandardMDContainer } from '@/components/Standard/StandardMDContainer';
import { QuestionModel } from '@/generated-api/Api';
import { AuthWrapper } from '@/utils/AuthWrapper';
import { api } from '@/utils/api';
import { splitTagsString } from '@/utils/tags';
import { useRequest } from 'ahooks';
import {
  Col,
  Divider,
  Layout,
  PageHeader,
  Row,
  Skeleton,
  Tabs,
  Tag,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

function QuestionDetail({ question }: { question: QuestionModel }) {
  const path = {
    pathname: '/questions/edit/' + question.id,
  };

  return (
    <Layout className="h-full" style={{ padding: '24px 0' }}>
      <Content style={{ padding: '0 24px' }}>
        <PageHeader
          ghost={false}
          className="h-full"
          title={question.title}
          subTitle="习题详情"
          onBack={() => window.history.back()}
        >
          <Content style={{ padding: '0 24px', minHeight: 600 }}>
            <Row span={24}>
              <Col>
                难度: <Tag color="red">困难</Tag>
              </Col>
              <Col offset={1}>
                创建时间: {moment(question.created_at).format('YYYY-MM-DD')}
              </Col>
              <Col offset={1}>创建者: {question.author}</Col>
              <Col offset={1}>
                标签:{' '}
                {splitTagsString(question.tags).map((tag, i) => (
                  <Tag color="blue" key={i}>
                    {tag}
                  </Tag>
                ))}
              </Col>
              <AuthWrapper codename="change_question">
                <Col offset={1}>
                  <Link to={path}>编辑题目</Link>
                </Col>
              </AuthWrapper>
            </Row>
            <Divider />

            <Tabs defaultActiveKey="1" size={'large'}>
              <TabPane tab="题目描述" key={1}>
                <StandardMDContainer
                  text={question.description}
                ></StandardMDContainer>
              </TabPane>
              <TabPane tab="题解" key={2}>
                <StandardMDContainer
                  text={question.solution}
                ></StandardMDContainer>
              </TabPane>
              <TabPane tab="分析" key={3}>
                <StandardMDContainer
                  text={question.analysis}
                ></StandardMDContainer>
              </TabPane>
            </Tabs>
          </Content>
        </PageHeader>
      </Content>
    </Layout>
  );
}

export function QuestionDetailPage({ id }: { id: string }) {
  const { data, loading } = useRequest(
    () => {
      return api.question.questionRetrieve(id);
    },
    { refreshDeps: [id] }
  );
  const question = data?.data;

  return (
    <Skeleton
      avatar
      active
      title={false}
      paragraph={{ rows: 18 }}
      loading={loading || !question}
    >
      <QuestionDetail question={question} />
    </Skeleton>
  );
}
