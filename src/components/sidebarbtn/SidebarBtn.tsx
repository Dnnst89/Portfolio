import { FaBars, FaArrowLeftLong } from "react-icons/fa6";

const SidebarBtn: React.FC<{ isOpen: boolean; onClick: () => void }> = ({
  isOpen,
  onClick,
}) => (
  <button
    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    onClick={onClick}
  >
    <span className="mr-2">
      {isOpen ? (
        <FaArrowLeftLong size={30} className="text-[#0891b2]" />
      ) : (
        <FaBars size={32} className="text-[#0891b2]" />
      )}
    </span>
  </button>
);

export default SidebarBtn;
