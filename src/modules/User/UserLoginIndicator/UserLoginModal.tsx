import { LoginModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useTokenContext } from '@/utils/auth-token';
import { useRequest } from 'ahooks';
import { Checkbox, Form, Input, message, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onRegister?: () => void;
  onForgottenPassword?: () => void;
}

type LoginFormData = LoginModel & { rememberMe: boolean };

export function UserLoginModal({
  visible,
  onClose,
  onRegister,
  onForgottenPassword,
}: Props) {
  const { setToken } = useTokenContext();
  const getUserInfo = (data: LoginModel) => {
    return api.auth
      .authLoginCreate(data)
      .then((res) => {
        setToken(res.data.key);
        onClose?.();
        message.success('登录成功');
      })
      .catch((err) => {
        message.error('登录失败，请检查账号和密码');
      });
  };
  const { run, loading } = useRequest(getUserInfo, { manual: true });
  const [form] = useForm<LoginFormData>();

  const resetForm = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <Modal
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => form.submit()}
      onCancel={onClose}
      title="登录"
      afterClose={resetForm}
      confirmLoading={loading}
      className="login-modal"
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
          label="账号"
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input placeholder="用户名或邮箱" autoFocus />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Row justify="space-between">
            <Col span={6}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Col>
            {/* <Col span={5}>
              <Form.Item>
                <Link to={{}} onClick={onForgottenPassword}>
                  忘记密码
                </Link>
              </Form.Item>
            </Col> */}
            <Col span={5.5}>
              <Form.Item>
                <Link to={{}} onClick={onRegister}>
                  立即注册
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
