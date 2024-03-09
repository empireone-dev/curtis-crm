import React from 'react'

export default function Select({ name, value, label, errorMessage, onChange, data,required }) {
    return (
        <div>
            <div className='relative' >
                <select
                required={required}
                    onChange={(e) => onChange(e.target.value, e.target.name)}
                    id={name}
                    name={name}
                    className='peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500' placeholder="" >
                   <option value=""></option>
                    {
                        data.map((res, i) => {
                            return <option key={i} value={res.value}>{res.name}</option>
                        })
                    }
                </select>
                <label
                    htmlFor={name}
                    className='absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white'>{label}</label>
            </div >
            {errorMessage && value == '' && (
                <p className='text-red-500 text-sm mt-1.5 font-light'>{errorMessage}</p>
            )}
        </div>
    )
}
