import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App, Button, Form, Input } from 'antd';
import { useUserContext } from '@/context/user';
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

  const { setUser } = useUserContext();

  const { setToken, clearToken } = useUserInfo();

  const location = useLocation();

  useEffect(() => {
    clearToken();
  }, []);

  // 表单提交时的处理函数
  const onFinish = (values: FieldType) => {
    console.log('Form Data:', values);
    service.user
      .login(values)
      .then((result) => {
        setToken(result.token);
        setUser(result.info);
        // 后续放到store中
        let from = '/';
        if (location.state?.from) {
          from = location.state.from;
        }
        console.log('from:', from);
        navigate(from, { replace: true });
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
          label="账号"
          name="userName"
          rules={[
            {
              required: true,
              message: '请输入账号名称!',
              validateTrigger: 'blur',
            },
          ]}
        >
          <Input placeholder="请输入账号名称/邮箱" />
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
      {localStorage.mode === 'dev' && (
        <p>
          <a
            className="cursor-pointer text-xs text-primary"
            onClick={() => navigate('/registry')}
          >
            没有账号？点此注册
          </a>
        </p>
      )}
      <p className="flex justify-between">
        <a
          className="cursor-pointer text-xs text-primary"
          onClick={() => navigate('/resetpw')}
        >
          重置密码
        </a>
        <a
          className="cursor-pointer text-xs text-primary"
          onClick={() => navigate('/applyForAccount')}
        >
          申请使用账号
        </a>
      </p>
    </div>
  );
}
export default Login;
