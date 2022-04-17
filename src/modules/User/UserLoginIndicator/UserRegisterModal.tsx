import { LoginModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { setToken } from '@/utils/auth-token';
import { useRequest } from 'ahooks';
import { Checkbox, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

type RegisterFormData = LoginModel & { rememberMe: boolean };

export function UserRegisterModal({ visible, onClose }: Props) {
  const setUserInfo = (data: LoginModel) => {
    return api.auth
      .createRegister(data)
      .then((res) => {
        setToken(res.data.key);
        onClose?.();
      })
      .catch((err) => {
        message.error('注册失败，请重试');
      });
  };
  const { run, loading } = useRequest(setUserInfo, { manual: true });
  const [form] = useForm<RegisterFormData>();

  const resetForm = useCallback(() => {
    form.resetFields();
  }, [form]);

  const valid_confirm_password = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('两次输入的密码不一致'));
    }
  })

  const valid_username = () => ({
    validator(_, value) {
      if ( !value || (value?.replace(/[\w.@+-]/g, '') === '' && value?.length <= 150) ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('用户名长度为150个字符或以下；只能包含字母、数字、特殊字符 @ . - _'));
    }
  })

  return (
    <Modal
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => form.submit()}
      onCancel={onClose}
      title="注册"
      afterClose={resetForm}
      confirmLoading={loading}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => run(values)}
        form={form}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }, valid_username]}
        >
          <Input placeholder="请输入用户名" autoFocus />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ type: 'email', message: '请输入正确的邮箱' }, { required: true, message: '请输入邮箱' }]}
        >
          <Input placeholder="请输入邮箱" autoFocus />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm-password"
          dependencies={['password']}
          rules={[{ required: true, message: '请重新输入密码' }, valid_confirm_password ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
