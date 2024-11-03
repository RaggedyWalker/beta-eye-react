import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

function LayoutToggle(props: { handleToggle: () => void; collapsed: boolean }) {
  return (
    <div
      className={`fixed bottom-5 left-6 flex cursor-pointer items-center rounded-md border-2 border-solid border-black/25 p-1 leading-[initial] text-black/35 hover:border-primary/70 hover:text-primary/70 ${props.collapsed ? '' : 'rotate-180'}`}
      onClick={props.handleToggle}
    >
      <MdOutlineKeyboardDoubleArrowRight
        size={20}
        className="transition-transform duration-150 hover:rotate-180"
      />
    </div>
  );
}

export default LayoutToggle;
