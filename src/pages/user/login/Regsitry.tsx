import { useNavigate } from 'react-router-dom';
import { App, Button, Form, Input } from 'antd';
import service from '@/service';

interface FieldType {
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  phone?: string;
}

function Registry() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();

  // 表单提交时的处理函数
  const onFinish = async (values: FieldType) => {
    console.log('Form Data:', values);
    try {
      await service.user.register(values);
      message.success('注册成功！');
      navigate('/login');
    } catch (e) {
      message.error((e as Error).message);
    }
  };

  // 只能本地开发看到注册页
  if (localStorage.mode !== 'dev') {
    window.location.href = '/eye/login';
    // navigate('/login', {replace: true});
  }

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
          rules={[
            { required: true, message: '请输入账号名称!' },
            { min: 3, message: '账号名称至少为 3 个字符!' },
          ]}
        >
          <Input placeholder="请输入账号名称" />
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码至少为 6 个字符!' },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码至少为 6 个字符!' },
            {
              validator(rule, value) {
                if (value && value !== form.getFieldValue('password')) {
                  return Promise.reject('两次输入的密码不一致，请重新输入');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
      <p>
        <a
          className="cursor-pointer text-xs text-primary"
          onClick={() => navigate('/login')}
        >
          已有账号？去登录吧!
        </a>
      </p>
    </div>
  );
}

export default Registry;
