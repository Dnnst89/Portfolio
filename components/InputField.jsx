'use client';
const InputField = (props) => {
    const fields = {
        type: '',
        placeHolder: '',
        userName: '',
        firstName: '',
        secondName: '',
        className: '',
    };
    const {
        type,
        placeholder,
        username,
        firstname,
        secondname,
        className,
        name,
    } = props;
    return (
        <>
            <input
                type={type}
                className={className}
                placeholder={placeholder}
            />
        </>
    );
};

export default InputField;
