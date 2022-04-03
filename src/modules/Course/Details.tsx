import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Descriptions,
  Typography,
  Divider,
  List,
  Avatar,
  Button,
} from 'antd';
import { CourseContent } from './components/CourseContent';

const { Title, Paragraph, Text, Link } = Typography;

const contentTest = [
  {
    title: '1',
    key: '1',
    articleId: '',
    children: [
      {
        title: '1-1',
        key: '1-1',
        articleId: '',
      },
      {
        title: '1-2',
        key: '1-2',
        articleId: '',
      },
    ],
  },
  {
    title: '2',
    key: '2',
    articleId: '',
    children: [
      {
        title: '2-1',
        key: '2-1',
        articleId: '',
      },
      {
        title: '2-2',
        key: '2-2',
        articleId: '',
      },
    ],
  },
];

let course = {};

export function Details() {
  const location = useLocation();
  if (location.state) course = location.state.course;
  course.contents = contentTest;

  const history = useHistory();
  const startLearning = () => {
    const path = {
      pathname: '/content',
      state: { course: course, articleId: course.contents[0].articleId },
    };
    history.push(path);
  };

  return (
    <div>
      <Row>
        <Col span={20} offset={2}>
          <br />
          <br />
          <Title>{course.title}</Title>
          <Divider />
        </Col>
      </Row>

      <Row align="middle">
        <Col span={4} offset={2}>
          <Image height={180} preview={false} src={course.cover} />
        </Col>
        <Col span={15} style={{ marginLeft: '20px' }}>
          <Descriptions column={1}>
            <Descriptions.Item label="课程名称">
              {course.title}
            </Descriptions.Item>
            <Descriptions.Item label="授课老师">
              {course.teacher}
            </Descriptions.Item>
            <Descriptions.Item label="联系方式">
              <a>{course.contact}</a>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row>
        <Col span={20} offset={2}>
          <Typography>
            <Divider />

            <Title level={2}>课程简介</Title>
            <Paragraph>{course.description}</Paragraph>

            <Title level={2}>学习资料</Title>
            <Paragraph>
              <List
                itemLayout="horizontal"
                dataSource={course.attachment}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<FilePdfTwoTone />} />}
                      title={<a href={item.url}>{item.name}</a>}
                    />
                  </List.Item>
                )}
              />
            </Paragraph>
          </Typography>
          <Title level={2}>课程目录</Title>

          <CourseContent course={course} />

          <div style={{ textAlign: 'center', margin: 25 }}>
            <Button type="default" onClick={startLearning}>
              开始学习
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
