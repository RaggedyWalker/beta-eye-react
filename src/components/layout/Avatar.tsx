import React from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { FiHome } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import { RiAdminLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'antd';
import { createStyles } from 'antd-style';
import { useUserContext } from '@/context/user';
import { FCProps } from '@/types/react';
import { User, UserRole } from '@/types/user';

interface CustomProps extends FCProps {
  onClick?: () => void;
}
const useStyles = createStyles(({ css }) => {
  return {
    dropMenuWrapper: css`
      list-style-type: none;
      margin: unset;
      padding: unset;
      display: flex;
      flex-direction: column;
      gap: 2px;
      max-width: 220px;
      > li {
        border-top-width: 2px;
        border-bottom-width: 0px;
        border-color: gray;
        padding: 8px 8px;
      }
    `,
  };
});

const DropMenu: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const { styles } = useStyles();
  return (
    <ul className={styles.dropMenuWrapper}>
      <DropMenuItem onClick={() => console.log(user)}>
        <FiHome />
        个人中心
      </DropMenuItem>
      {user?.role === UserRole.ADMIN && (
        <DropMenuItem onClick={() => navigate('/background')}>
          <RiAdminLine />
          后台管理
        </DropMenuItem>
      )}
      <DropMenuItem onClick={() => navigate('/login')}>
        <IoMdExit />
        退出账号
      </DropMenuItem>
    </ul>
  );
};

const DropMenuItem: React.FC<CustomProps> = (props) => {
  return (
    <li
      className="flex cursor-pointer items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary"
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};

function Avatar(props: FCProps) {
  const { user } = useUserContext();
  console.log(user);
  return (
    <Popover
      content={<DropMenu user={user} />}
      arrow={false}
      trigger={'click'}
      overlayClassName="px-0"
      overlayStyle={{ width: '150px', textAlign: 'center' }}
    >
      <span className="flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-center hover:bg-primary/10 hover:text-primary">
        <FaRegUser className="h-4 w-4" />
        <span>{user?.userName}</span>
      </span>
    </Popover>
  );
}
export default Avatar;
