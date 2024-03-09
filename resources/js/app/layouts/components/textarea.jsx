
export default function Textarea({ name, value, label, type, errorMessage, onChange }) {


    return (
        <div>
            <div className='relative' >
                <textarea
                    onChange={(e) => onChange(e.target.value, e.target.name)}
                    type={type}
                    id={name}
                    name={name}
                    className='peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500' placeholder="" >
                    {
                        value
                    }
                </textarea>
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
