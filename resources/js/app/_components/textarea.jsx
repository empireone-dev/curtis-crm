import React, { forwardRef } from "react";

// 1. Wrap the component in forwardRef
const Textarea = forwardRef(({
    required,
    name,
    label,
    ...props 
}, ref) => { // 2. Receive the 'ref' as the second parameter
    return (
        <div className="w-full">
            <div className="relative">
                <textarea
                    {...props}
                    ref={ref} // 3. Attach the ref to the HTML element
                    required={required}
                    id={name}
                    name={name}
                    className="peer pl-8 text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                    placeholder=" "
                />

                <label
                    htmlFor={name}
                    className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                >
                    {label}
                </label>
            </div>
        </div>
    );
});

// Set a display name for easier debugging in React DevTools
Textarea.displayName = "Textarea";

export default Textarea;