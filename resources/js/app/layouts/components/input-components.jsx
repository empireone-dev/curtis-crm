import React from 'react'

export default function InputComponents({ name, label, placeholder, type, onChange, required, value }) {
  return (
    <>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                name={name}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                type={type}
                required={required}
                placeholder={placeholder} />
    </>
  )
}
