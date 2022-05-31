import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { QuestionSetNodeModel, PatchedQuestionSetNodeModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Button, Col, Row, Table, Input, Form, message, Popconfirm } from 'antd';
import { default as React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

interface Props {
  questionNodeId?: number;
}

export function QuestionSetNodeEditingPage({ questionNodeId }: Props) {
  const { data, loading } = useRequest(
    () => {
      return questionNodeId 
             ? api.questionSet.questionSetRetrieve(questionNodeId)
             : api.questionSet.questionSetList();
    },
    { refreshDeps: [questionNodeId] }
  );
  const questionSetList = data?.data && (questionNodeId ? [data.data] : data.data);
  const [questionSet, setQuestionSet] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      title: '习题集' + (questionNodeId ? '目录' : '名'),
      dataIndex: 'label',
      key: 'label',
      render: (label: string, row: QuestionSetNodeModel) => {
        const path = {
          pathname: questionNodeId 
                    ? `/questions/` + row.question
                    : '/questions/sets/' + row.id,
        }
        return (!questionNodeId || row.question !== null)
               ? <Link to={path}>{label}</Link>
               : <span>{label}</span>
      },
    }, 
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, row: QuestionSetNodeModel) => {
        return <>
          <a disabled={isEditing} onClick={() => renameQuestionSet(row)}>重命名</a>
          &nbsp;&nbsp;
          <a disabled={isEditing} onClick={() => addQuestionSet(row)}>添加</a>
          &nbsp;&nbsp;
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => deleteQuestionSet(row)}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <a disabled={isEditing} href="#">删除</a>
          </Popconfirm>
          
        </>
      },
    }
  ];

  const uploadQuestionSet = (questionSet: PatchedQuestionSetNodeModel) => {
    (questionSet.id
      ? (questionSet.label
        ? api.questionSet.questionSetPartialUpdate(questionSet.id, questionSet)
        : api.questionSet.questionSetDestroy(questionSet.id)
        )
      : api.questionSet.questionSetCreate(questionSet)
    )
      .then((res) => {
        message.success("更新成功");
        // To do
        // 重新请求数据
      })
      .catch((err) => {
        message.error('上传失败, 请稍后重试.');
      });
  };
  const { run } = useRequest(uploadQuestionSet, { manual: true });

  const renameQuestionSet = (qs: QuestionSetNodeModel) => {
    setQuestionSet(qs);
    setIsEditing(true);
  }

  const addQuestionSet = (qs: QuestionSetNodeModel) => {
    setIsEditing(true);
  }

  const deleteQuestionSet = (qs: QuestionSetNodeModel) => {
    if (qs.children?.[0] || qs.question !== null) {
      message.error("习题集非空, 无法删除!");
    } else {
      run({id: qs.id});
    }
  }

  const onFormFinish = (formData: PatchedQuestionSetNodeModel) => {
    if (formData.label) {
      if (questionNodeId && !questionSet.label) { 
        // To do: InsertQuestionSet
      } else if (questionSet.label !== formData.label) {
        questionSet.label = formData.label;
        run(questionSet);
      }
    }
    questionSet.id && setQuestionSet({});
    form.resetFields();
    setIsEditing(false);
  }
  
  type QuestionSetFormData = PatchedQuestionSetNodeModel;
  const [form] = useForm<QuestionSetFormData>();

  return <>
    {
    isEditing &&
    <Form
      initialValues={questionSet}
      form={form}
      layout={"inline"}
      onFinish={(values) => onFormFinish(values)}
    >
      <Form.Item name="label">
        <Input placeholder="请输入习题集名" style={{ width: "400px" }} autoFocus/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading}>
          {loading ? "上传中" : (questionSet.id ? "修改/取消" : "添加/取消")}
        </Button>
      </Form.Item>
    </Form>
    }
    <Table
      columns={columns}
      dataSource={questionSetList}
      loading={loading}
      rowKey="id"
      expandable={questionNodeId ? {} : { childrenColumnName: 'N/A' }}
    />
  </>
}