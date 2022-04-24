import { StandardMDContainer } from '@/components/Standard/StandardMDContainer';
import { QuestionModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import moment from 'moment';
import { useRequest } from 'ahooks';
import { splitTagsString } from "@/utils/tags";
import {
  Layout,
  Skeleton,
  Tabs,
  Divider,
  Typography,
  PageHeader,
  Row, 
  Col,
  Tag,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;

function QuestionDetail({ question }: { question: QuestionModel }) {
  return (
    <Content>
      <PageHeader 
      	  title={question.title}
          onBack={() => window.history.back()}
          style={{positive: "relative", padding: 0}}
        >
      </PageHeader>
      <Divider />
      <Row span={24}>
      	  <Col>难度: <Tag color="red">困难</Tag></Col>
      	  <Col offset={1}>创建时间: {moment(question.created_at).format('YYYY-MM-DD')}</Col>
      	  <Col offset={1}>创建者: {question.author}</Col>
          <Col offset={1}>标签: {splitTagsString(question.tags).map( (tag, i) => <Tag color="blue" key={i}>{tag}</Tag>)}</Col>
      </Row>

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
