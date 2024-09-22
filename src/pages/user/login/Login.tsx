import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Button, Form, Input } from 'antd';
import service from '@/service';
import useUserInfo from '@/hooks/useUserInfo';

interface FieldType {
  userName?: string;
  password: string;
  email?: string;
  phone?: string;
}

function Login() {
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { setToken, clearToken } = useUserInfo();

  useEffect(() => {
    clearToken();
  }, []);

  // 表单提交时的处理函数
  const onFinish = (values: FieldType) => {
    console.log('Form Data:', values);
    service.user
      .login(values)
      .then((result) => {
        setToken(result.data.token);
        navigate('/');
      })
      .catch((e) => {
        message.error((e as Error).message);
      });
  };

  return (
    <div>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        variant={'filled'}
      >
        <Form.Item
          label="账号名称"
          name="userName"
          rules={[{ required: true, message: '请输入账号名称!' }]}
        >
          <Input placeholder="请输入账号名称" />
        </Form.Item>

        {/* <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              pattern: /^[1][3-9][0-9]{9}$/,
              message: '请输入有效的手机号!',
            },
          ]}
        >
          <Input placeholder="请输入手机号（选填）" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              type: 'email',
              message: '请输入有效的邮箱地址!',
            },
          ]}
        >
          <Input placeholder="请输入邮箱（选填）" />
        </Form.Item> */}

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
      <p>
        <a
          className="text-xs text-primary cursor-pointer"
          onClick={() => navigate('/registry')}
        >
          没有账号？点此注册
        </a>
      </p>
    </div>
  );
}
export default Login;
