"use client";
import { Field } from "formik";
export default function FormikField({ label, id, htmlFor }) {
    return (
        <>
            <label className="border border-none mb-1" htmlFor={htmlFor}>
                {label}
            </label>
            <Field type="text"
                id={id}
                name={id}

                className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"

            />

        </>
    );
}