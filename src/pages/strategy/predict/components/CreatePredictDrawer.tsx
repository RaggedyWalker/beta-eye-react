import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/lib/drawer/DrawerPanel';
import { FCProps } from '@/types/react.ts';
import CreatePredictForm from '@/pages/strategy/predict/components/CreatePredictForm.tsx';

interface CustomProps extends FCProps {
  open: boolean;
  onClose: () => void;
  onCreatedPredict: () => void;
}

const drawerStyles: DrawerStyles = {
  mask: {
    backdropFilter: 'blur(1.5px)',
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
      width={520}
      styles={drawerStyles}
    >
      <CreatePredictForm
        onClose={props.onClose}
        onCreatedPredict={props.onCreatedPredict}
      ></CreatePredictForm>
    </Drawer>
  );
}

export default CreatePredictDrawer;
