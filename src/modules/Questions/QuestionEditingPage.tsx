import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { VditorEditor } from '@/components/Standard/StandardVditorEditor';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Form, Input, Button, message, Skeleton, Col, Row, Row } from 'antd';
import { QuestionModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from 'react-router-dom';
import { mathFormat } from '@/components/Standard/StandardMDContainer';

export const VditorCDN = 'https://beta.maki-math.com/static/vditor@3.8.13';

function QuestionEditing({ question }: { question: QuestionModel }) {
  const question_keys_alias = [
    { name: 'title', alias: '标题' },
    { name: 'author', alias: '作者' },
    { name: 'tags', alias: '标签' },
    { name: 'description', alias: '问题' },
    { name: 'solution', alias: '答案' },
    { name: 'analysis', alias: '分析' },
  ];
  const question_id = question.id;
  const history = useHistory();

  const beforeUpload = (question: QuestionModel) => {
    for (const item of question_keys_alias) {
      if (question[item.name] === '') {
        message.error(item.alias + '不能为空!');
        return;
      }
    }
    run(question);
  };

  const uploadQuestion = (question: QuestionModel) => {
    (question_id
      ? api.question.questionUpdate(question_id, question)
      : api.question.questionCreate(question)
    )
      .then((res) => {
        const path = {
          pathname: `/questions/${res.data.id}`,
        };
        history.push(path);
      })
      .catch((err) => {
        message.error('上传失败, 请稍后重试.');
      });
  };
  const { loading, run } = useRequest(uploadQuestion, { manual: true });

  type QuestionFormData = QuestionModel;
  const [form] = useForm<QuestionFormData>();

  return (
    <StandardPageLayout title="题目编辑">
      <Form
        initialValues={question}
        form={form}
        onFinish={(values) => beforeUpload(values)}
      >
        {question_keys_alias.slice(0, 3).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index}>
            <Input />
          </Form.Item>
        ))}{' '}
        {question_keys_alias.slice(3).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index} hidden>
            <Input />
          </Form.Item>
        ))}{' '}
        {question_keys_alias.slice(3).map((item, index) => (
          <Form.Item label={item.alias} key={index}>
            {VditorEditor({
              id: 'vditor' + item.name,
              after: (vditor) => {
                const md = mathFormat(question[item.name]);
                vditor.setValue(md);
              },
              input: (md) => {
                const field = {};
                field[item.name] = md;
                form.setFieldsValue(field);
              },
              cdn: VditorCDN,
            })}
          </Form.Item>
        ))}
        <Form.Item>
          <Row justify="center">
            <Col>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? '上传中' : '上传'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardPageLayout>
  );
}

export const QuestionEditingPage = ({ id }: { id: number }) => {
  let question;
  if (id > 0) {
    const { data, loading } = useRequest(
      () => {
        return api.question.questionRetrieve(id);
      },
      { refreshDeps: [id] }
    );
    question = data?.data;
  } else {
    question = {
      title: '',
      tags: '',
      author: '',
      description: '',
      solution: '',
      analysis: '',
    };
  }
  return (
    <Skeleton
      avatar
      active
      title={false}
      paragraph={{ rows: 18 }}
      loading={!question}
    >
      <QuestionEditing question={question} />
    </Skeleton>
  );
};
