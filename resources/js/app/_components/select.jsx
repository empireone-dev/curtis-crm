import React from "react";

export default function Select({ options, value, onChange, label,name }) {
    return (
        <div className="w-full">
            <div className="relative">
                <select
                    name={name}
                    className="peer pl-4 text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                    value={value}
                    onChange={onChange}
                >
                    {
                        !value && <option disabled selected></option>
                    }
                    { options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor={name}
                    className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                >
                    {label}
                </label>
            </div>
        </div>
    );
}
