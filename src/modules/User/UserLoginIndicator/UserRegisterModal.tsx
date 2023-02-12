import { RegisterModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import {
  fetchPermissions,
  usePermissionsContext,
  useTokenContext,
} from '@/utils/auth-token';
import { useRequest } from 'ahooks';
import { Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FieldData } from 'rc-field-form/lib/interface';
import React, { useCallback } from 'react';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

type RegisterFormData = RegisterModel & { rememberMe: boolean };

export function UserRegisterModal({ visible, onClose }: Props) {
  const { setToken } = useTokenContext();
  const { setPermissions } = usePermissionsContext();
  const [form] = useForm<RegisterFormData>();
  const register = useCallback(
    (data: RegisterFormData) => {
      return api.auth
        .authRegistrationCreate({
          username: data.username ?? '',
          password1: data.password1,
          password2: data.password2,
          email: data.email,
        })
        .then((res) => {
          setToken(res.data.key);
          fetchPermissions(setPermissions);
          onClose?.();
        })
        .catch((err) => {
          const errorObject = err?.response?.data as
            | Record<string, string[]>
            | undefined;
          if (errorObject) {
            const errorFields: FieldData[] = Object.entries(errorObject).map(
              ([k, v]) => {
                return { name: k, errors: v };
              }
            );
            form.setFields(errorFields);
          }
          message.error(`注册失败`);
        });
    },
    [form]
  );

  const { run, loading } = useRequest(register, { manual: true });
  const resetForm = useCallback(() => {
    form.resetFields();
  }, [form]);

  const valid_confirm_password = ({ getFieldValue }) => ({
    validator(_: any, value: string | undefined) {
      if (!value || getFieldValue('password1') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('两次输入的密码不一致'));
    },
  });

  const valid_username = () => ({
    validator(_: any, value: string | undefined) {
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
          name="password1"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="password2"
          dependencies={['password1']}
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
