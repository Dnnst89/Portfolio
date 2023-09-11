"use client";
import ErrorForm from "./ErrorForm";

const InputField = ({
    type,
    id,
    name,
    value,
    placeholder,
    onChange,
    error,
    touched,
}) => (
    <div>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border rounded-lg border-none"
            autoFocus={true}
            onChange={onChange}
        />
        {error && touched && <ErrorForm>{error}</ErrorForm>}
    </div>
);

export default InputField;
