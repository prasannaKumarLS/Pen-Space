import { useState } from "react";

export default function InputText(props) {
  const [error, setError] = useState("");
  const { maxChar, field } = props;
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > maxChar) {
      setError("Maximum 12 characters allowed");
    } else {
      setError("");
    }
    props.onChange(e);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor={field} className="block mb-1 font-medium text-gray-700">
        {props.name}
      </label>
      <input
        type={field === "password" ? "password" : "text"}
        id={field}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        }`}
        value={props.value}
        onChange={handleChange}
        required
      />
      {maxChar && (
        <div className="flex justify-between mt-1 text-sm">
          <span className={`${error ? "text-red-500" : "text-gray-500"}`}>
            {error || ""}
          </span>
          <span
            className={`${
              props.value.length > maxChar
                ? "text-red-500 absolute left-[280px] bottom-[35px]"
                : "text-gray-400 absolute left-[275px] bottom-[15px]"
            } `}
          >
            {props.value.length}/{maxChar}
          </span>
        </div>
      )}
    </div>
  );
}
