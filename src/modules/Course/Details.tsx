// eslint-disable-next-line
// @ts-nocheck
import React from 'react';
import {useLocation} from 'react-router-dom';
import {  Row, Col, Image, Descriptions, Typography, Divider, List, Avatar, Button } from 'antd';
import { Course } from '../Home/components/CourseView/CourseView'
import { CourseDetailMock } from './mock/CourseDetailMock'
import { CourseContent } from './components/CourseContent.tsx'
import {
  FilePdfTwoTone,
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

const blockContent = '';

export interface CourseDetailProps {
  course: Course,
  details: {
    teacher: string,
    photo: string,
    contact: string,
    book: string,
    introduction: string,
    requirement: string,
    content: [], 
    attachment: [], // {name: '', url: ''}
    homework: [], // {name: '', url: ''}
  }
}

export function Details() {  
  // const location = useLocation();
  // const course = location.state.course;

  return (
    <div>
      <Row>
        <Col span={20} offset={2}>
          <br/><br/>
          <Title>{ CourseDetailMock.course.title }</Title>
          <Divider />
        </Col>
      </Row>

      <Row align="middle">
        <Col span={4} offset={2}>
          <Image
            height={180}
            preview={false}
            src={CourseDetailMock.details.photo}
          />
        </Col>
        <Col span={15} style={{ marginLeft: '20px' }}>
          <Descriptions column={1}>
            <Descriptions.Item label="课程名称">
              { CourseDetailMock.course.title }
            </Descriptions.Item>
            <Descriptions.Item label="授课老师">
              { CourseDetailMock.details.teacher }
            </Descriptions.Item>
            <Descriptions.Item label="联系方式">
              <a>{ CourseDetailMock.details.contact }</a>
            </Descriptions.Item>
            <Descriptions.Item label="课程要求">
              { CourseDetailMock.details.requirement }
            </Descriptions.Item>
            <Descriptions.Item label="教材">
              { CourseDetailMock.details.book }
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row>
        <Col span={20} offset={2}>
          <Typography>
            <Divider />

            <Title level={2}>课程简介</Title>
            <Paragraph>
              { CourseDetailMock.details.introduction }
            </Paragraph>

            <Title level={2}>学习资料</Title>
            <Paragraph>
              <List
                itemLayout="horizontal"
                dataSource={CourseDetailMock.details.attachment}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={ <FilePdfTwoTone /> } />}
                      title={<a href={item.url}>{item.name}</a>}
                    />
                  </List.Item>
                )}
              />
            </Paragraph>
              
            <Title level={2}>作业</Title>
            <Paragraph>
              <List
                itemLayout="horizontal"
                dataSource={CourseDetailMock.details.homework}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={ <FilePdfTwoTone /> } />}
                      title={<a href={item.url}>{item.name}</a>}
                    />
                  </List.Item>
                )}
              />
            </Paragraph>
          </Typography>
          <Title level={2}>课程目录</Title>
          <CourseContent content={ CourseDetailMock.details.content }></CourseContent>              
          <div style={{ textAlign: 'center', margin: 25 }}>
            <Button type="default" href='#/content'>
              开始学习
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}