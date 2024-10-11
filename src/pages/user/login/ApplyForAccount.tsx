import { useNavigate } from 'react-router-dom';
import { App, Button, Form, Input } from 'antd';
import service from '@/service';

interface FieldType {
  userName: string;
  email: string;
  phone?: string;
  inviteKey?: string;
  reason: string;
}

function ApplyForAccount() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();

  // 表单提交时的处理函数
  const onFinish = async (values: FieldType) => {
    console.log('Form Data:', values);
    try {
      await service.user.checkIfUserExist(values);
      const result = await service.user.applyForAccount(values);
      message.success(result.message);
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
          label="邮箱"
          name="email"
          required
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
          label="邀请码"
          name="inviteKey"
          tooltip="如有邀请码，后台会自动处理申请"
        >
          <Input placeholder="请输入邀请码（选填）" />
        </Form.Item>

        <Form.Item label="申请原因" name="reason" required>
          <Input
            placeholder="请输入申请原因（选填）"
            maxLength={20}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            申请
          </Button>
        </Form.Item>
      </Form>
      <p>
        <a
          className="text-xs text-primary cursor-pointer"
          onClick={() => navigate('/login')}
        >
          已有账号？去登录吧!
        </a>
      </p>
    </div>
  );
}

export default ApplyForAccount;
