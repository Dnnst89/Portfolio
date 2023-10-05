"use client";
export default function InputForm({ label, id, htmlFor }) {
  return (
    <>
      <label className="border border-none mb-1" htmlFor={htmlFor}>
        {label}
        <span className="text-pink-200 ml-1">*</span>
      </label>
      <input
        className="border-2 border-grey-200/40 outline-pink-200/30 mb-4"
        id={id}
      />
    </>
  );
}
