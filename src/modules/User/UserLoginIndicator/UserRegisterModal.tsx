import { LoginModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import {
  useTokenContext,
  usePermissionsContext,
  fetchPermissions,
} from '@/utils/auth-token';
import { useRequest } from 'ahooks';
import { Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

type RegisterFormData = LoginModel & { rememberMe: boolean };

export function UserRegisterModal({ visible, onClose }: Props) {
  const { setToken } = useTokenContext();
  const { setPermissions } = usePermissionsContext();
  const setUserInfo = (data: LoginModel) => {
    return api.auth
      .authRegistrationCreate({
        username: data.username ?? '',
        password1: data.password,
        password2: data.password,
        email: data.email,
      })
      .then((res) => {
        setToken(res.data.key);
        fetchPermissions(setPermissions);
        onClose?.();
      })
      .catch(() => {
        message.error('注册失败，请重试');
        // TODO 根据err内容在表单中展示错误信息
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
    },
  });

  const valid_username = () => ({
    validator(_, value) {
      if (
        !value ||
        (value?.replace(/[\w.@+-]/g, '') === '' && value?.length <= 150)
      ) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(
          '用户名长度为150个字符或以下；只能包含字母、数字、特殊字符 @ . - _'
        )
      );
    },
  });

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
        name="register_form"
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
          rules={[
            { type: 'email', message: '请输入正确的邮箱' },
            { required: true, message: '请输入邮箱' },
          ]}
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
          rules={[
            { required: true, message: '请重新输入密码' },
            valid_confirm_password,
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
