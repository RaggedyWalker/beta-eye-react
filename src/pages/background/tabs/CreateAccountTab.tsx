import { useCallback, useEffect, useState } from 'react';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { Input, Modal, Table, TableProps } from 'antd';
import service from '@/service';
import { AccountApplication } from '@/types/service';

interface DateType extends AccountApplication {
  key: number;
}

function getColumns(props: {
  setCurrentApplication: React.Dispatch<
    React.SetStateAction<DateType | undefined>
  >;
  setOpenApprove: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenReject: React.Dispatch<React.SetStateAction<boolean>>;
  setRejectReason: React.Dispatch<React.SetStateAction<string>>;
}) {
  const columns: TableProps<DateType>['columns'] = [
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
      width: '15%',
    },
    {
      title: '申请原因',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
      width: '50%',
    },
    {
      title: '邀请码',
      dataIndex: 'inviteKey',
      key: 'inviteKey',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '10%',
      render: (text, record) => {
        return <Operation {...props} record={record} />;
      },
    },
  ];
  return columns;
}

const Operation: React.FC<{
  setCurrentApplication: React.Dispatch<
    React.SetStateAction<DateType | undefined>
  >;
  setOpenApprove: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenReject: React.Dispatch<React.SetStateAction<boolean>>;
  setRejectReason: React.Dispatch<React.SetStateAction<string>>;
  record: DateType;
}> = (props) => {
  return (
    <div className="flex gap-2 text-lg">
      <FaRegCircleCheck
        className="cursor-pointer hover:text-primary"
        onClick={() => {
          props.setCurrentApplication(props.record);
          props.setOpenApprove(true);
        }}
      ></FaRegCircleCheck>
      <FaRegCircleXmark
        className="cursor-pointer hover:text-primary"
        onClick={() => {
          props.setCurrentApplication(props.record);
          props.setOpenReject(true);
          props.setRejectReason('');
        }}
      ></FaRegCircleXmark>
    </div>
  );
};

const CreateAccountTab: React.FC = () => {
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [applicationlist, setApplicationlist] = useState<DateType[]>([]);
  const [currentApplication, setCurrentApplication] = useState<DateType>();
  const [rejectReason, setRejectReason] = useState('');

  const fetchList = useCallback(() => {
    service.user.getAccountApplicationList({}).then((res) => {
      console.log(res);
      setApplicationlist(
        res.map((item) => ({
          ...item,
          key: item.id,
        })),
      );
    });
  }, []);
  useEffect(() => {
    fetchList();
  }, []);

  const approveApply = useCallback((record: DateType | undefined) => {
    if (record) {
      service.user
        .approveAccountApplication({
          id: record.id,
        })
        .then(() => {
          setOpenApprove(false);
          fetchList();
        });
    }
  }, []);
  const rejectApply = useCallback(
    (record: DateType | undefined, reason?: string) => {
      if (record) {
        service.user
          .rejectAccountApplication({
            id: record.id,
            reason,
          })
          .then(() => {
            setOpenReject(false);
            fetchList();
          });
      }
    },
    [],
  );

  return (
    <div className="px-4">
      <Table
        bordered
        className=""
        dataSource={applicationlist}
        columns={getColumns({
          setCurrentApplication,
          setOpenApprove,
          setOpenReject,
          setRejectReason,
        })}
        size="middle"
        pagination={false}
      ></Table>
      {openApprove && (
        <Modal
          open
          title="通过申请"
          onClose={() => setOpenApprove(false)}
          onCancel={() => setOpenApprove(false)}
          onOk={() => approveApply(currentApplication)}
        ></Modal>
      )}
      {openReject && (
        <Modal
          open
          title="拒绝申请"
          onOk={() => rejectApply(currentApplication, rejectReason)}
          onClose={() => setOpenReject(false)}
          onCancel={() => setOpenReject(false)}
        >
          <p className="flex items-center gap-6 py-6">
            <span className="text-nowrap">拒绝原因：</span>
            <Input
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
              }}
              maxLength={20}
              placeholder="非必填"
              showCount
            ></Input>
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CreateAccountTab;
