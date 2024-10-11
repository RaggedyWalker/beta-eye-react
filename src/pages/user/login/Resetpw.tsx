import { useNavigate } from 'react-router-dom';
import { App, Button, Form, Input } from 'antd';
import service from '@/service';

interface FieldType {
  userName: string;
  oldpw: string;
  newpw: string;
  repeatNewpw: string;
}

function Resetpw() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();

  // 表单提交时的处理函数
  const onFinish = async (values: FieldType) => {
    console.log('Form Data:', values);
    try {
      await service.user.resetpw({
        userName: values.userName,
        oldpw: values.oldpw,
        newpw: values.newpw,
      });
      message.success('密码重置成功');
      navigate('/login');
    } catch (e) {
      message.error((e as Error).message);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        variant={'filled'}
        autoComplete="new-password"
      >
        <Form.Item
          label="账号名称"
          name="userName"
          rules={[{ required: true, message: '请输入账号名称!' }]}
        >
          <Input placeholder="请输入账号名称" autoComplete="new-password" />
        </Form.Item>

        <Form.Item label="旧密码" name="oldpw" required>
          <Input.Password
            placeholder="请输入旧密码"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newpw"
          required
          rules={[
            { min: 6, message: '密码至少为 6 个字符!' },
            {
              validator(rule, value) {
                if (value && value === form.getFieldValue('oldpw')) {
                  return Promise.reject('新密码不能与就密码一致');
                }
                return Promise.resolve();
              },
              validateTrigger: 'blur',
            },
          ]}
        >
          <Input.Password
            placeholder="请输入新密码"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="repeatNewpw"
          required
          rules={[
            { min: 6, message: '密码至少为 6 个字符!' },
            {
              validator(rule, value) {
                if (value && value !== form.getFieldValue('newpw')) {
                  return Promise.reject('两次输入的密码不一致，请重新输入');
                }
                return Promise.resolve();
              },
              validateTrigger: 'blur',
            },
          ]}
        >
          <Input.Password
            placeholder="请再次输入新密码"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>
        <a
          className="text-xs text-primary cursor-pointer"
          onClick={() => navigate('/login')}
        >
          返回登录
        </a>
      </p>
    </div>
  );
}

export default Resetpw;
