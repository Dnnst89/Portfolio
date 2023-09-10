const TrackUserState = ({ user }) => {
    return <>{user ? <span>isConected</span> : "No user yet"}</>;
};

export default TrackUserState;
