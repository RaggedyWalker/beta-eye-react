import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/lib/drawer/DrawerPanel';
import { FCProps } from '@/types/react.ts';
import CreatePredictForm from '@/pages/strategy/predict/components/CreatePredictForm.tsx';

interface CustomProps extends FCProps {
  open: boolean;
  onClose: () => void;
  onCreatedPredict: () => void;
  containerElement: HTMLElement | null | undefined;
}

const drawerStyles: DrawerStyles = {
  mask: {
    backdropFilter: 'blur(1.5px)',
  },
  header: {
    textAlign: 'center',
  },
  // content: {
  //   height: '60%',
  // },
};

function CreatePredictDrawer(props: CustomProps) {
  const { containerElement } = props;
  console.log(containerElement);
  return (
    <Drawer
      placement="bottom"
      title="新增预测"
      onClose={props.onClose}
      open={props.open}
      width={520}
      height="100%"
      styles={drawerStyles}
      rootStyle={{ position: 'absolute' }}
      getContainer={containerElement || false}
    >
      <CreatePredictForm
        onClose={props.onClose}
        onCreatedPredict={props.onCreatedPredict}
      ></CreatePredictForm>
    </Drawer>
  );
}

export default CreatePredictDrawer;
