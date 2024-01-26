import { Drawer, DrawerProps } from 'antd';
import { DrawerStyles } from 'antd/lib/drawer/DrawerPanel';
import { FCProps } from '@/types/react.ts';
import CreatePredictForm from '@/pages/strategy/predict/components/CreatePredictForm.tsx';

interface CustomProps extends FCProps {
  open: boolean;
  onClose: DrawerProps['onClose'];
}

const drawerStyles: DrawerStyles = {
  mask: {
    backdropFilter: 'blur(1px)',
  },
  header: {
    textAlign: 'center',
  },
};

function CreatePredictDrawer(props: CustomProps) {
  return (
    <Drawer
      title="新增预测"
      onClose={props.onClose}
      open={props.open}
      width={400}
      // size="large"
      styles={drawerStyles}
    >
      <CreatePredictForm></CreatePredictForm>
    </Drawer>
  );
}

export default CreatePredictDrawer;
