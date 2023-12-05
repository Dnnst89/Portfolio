const TrackUserState = ({ text, user }) => {
    return (
        <>
            <div>
                <p className=" text-[12px] text-orange ">{text}</p>
                <span className="text-[11px]">{user}</span>
            </div>
        </>
    );
};

export default TrackUserState;
