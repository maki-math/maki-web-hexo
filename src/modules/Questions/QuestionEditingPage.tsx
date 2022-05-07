import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import React, { useState, useEffect } from 'react';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import { useRequest } from 'ahooks';
import { Form, Input, Button } from 'antd';
import { QuestionModel } from '@/generated-api/Api';
import { api } from '@/utils/api';

export const QuestionEditingPage = () => {
  const [qs, setQs] = useState({
    id: 0,
    title: ' ',
    tags: ' ',
    author: ' ',
    description: ' ',
    solution: ' ',
    analysis: ' ',
    created_at: ' ',
    updated_at: ' ',
  });

  // description
  const [vd_description, setDescription] = useState<Vditor>();
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      after: () => {
        vditor.setValue(' 在此处输入题目内容');
        setDescription(vditor);
      },
      mode: 'ir',
      height: 360,
      input: (md) => {
        qs.description = md;
      },
    });
  }, []);

  // solution
  const [vd_solution, setSolution] = useState<Vditor>();
  useEffect(() => {
    const vd_solu = new Vditor('vd_solu', {
      after: () => {
        vd_solu.setValue(' 答案');
        setSolution(vd_solu);
      },
      mode: 'ir',
      height: 200,
      input: (md) => {
        qs.solution = md;
      },
    });
  }, []);

  // analysis
  const [vd_analysis, setAnalysis] = useState<Vditor>();
  useEffect(() => {
    const vd_analy = new Vditor('vd_analy', {
      after: () => {
        vd_analy.setValue(' 解析');
        setAnalysis(vd_analy);
      },
      mode: 'ir',
      height: 200,
      input: (md) => {
        qs.analysis = md;
      },
    });
  }, []);

  const uploadQuestion = (question: QuestionModel) => {
    // alert('正在上传：'+question.description +  question.solution);
    //待修复
    api.question.questionCreate(question);
  };

  const { loading, run } = useRequest(
    () => {
      uploadQuestion(qs);
    },
    {
      manual: true,
    }
  );

  // 监听表单输入变化
  const changeTitle = (e) => {
    qs.title = e.target.value;
  };

  const changeTags = (e) => {
    qs.tags = e.target.value;
  };

  const changeId = (e) => {
    qs.id = e.target.value;
  };

  const changeAuthor = (e) => {
    qs.author = e.target.value;
  };

  return (
    <StandardPageLayout title="题目编辑">
      {/* title id auth tags */}
      <Form>
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input onChange={changeTitle} />
        </Form.Item>
        <Form.Item name="id" label="题目编号" rules={[{ required: true }]}>
          <Input onChange={changeId} />
        </Form.Item>
        <Form.Item name="author" label="作者" rules={[{ required: true }]}>
          <Input onChange={changeAuthor} />
        </Form.Item>
        <Form.Item name="tags" label="关键词" rules={[{ required: true }]}>
          <Input onChange={changeTags} />
        </Form.Item>
      </Form>

      {/* vditor */}
      <div id="vditor" className="vditor" />
      <div id="vd_solu" className="vditor" />
      <div id="vd_analy" className="vditor" />

      <Button
        type="primary"
        disabled={loading}
        onClick={() => {
          run(qs);
        }}
      >
        {loading ? '上传中' : '上传'}
      </Button>
    </StandardPageLayout>
  );
};
