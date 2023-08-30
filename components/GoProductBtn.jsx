import { HiArrowSmRight } from 'react-icons/hi';
const GoProductBtn = ({ title, icon }) => {
    return (
        <button className="w-full flex">
            {title}
            <span>{icon}</span>
        </button>
    );
};

export default GoProductBtn;
