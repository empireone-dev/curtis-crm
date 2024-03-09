
export default function Input({ name, value, label, type, errorMessage, onChange, required }) {

    function formType() {
        if (type == 'text') {
            return value;
        } else if (type == 'number') {
            return value?.replace(/[^0-9.]/g, '');
        } else if (type == 'phone') {
            const phoneNumber = value?.replace(/\D/g, '').substring(0, 10);
            if (phoneNumber?.length === 10) {
                return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else {
                // Handle invalid phone number format
                return phoneNumber;
            }
        } else {
            return value
        }
    }
    return (
        <div>
            <div className='relative' >
                <input
                    required={required}
                    value={formType() ?? ''}
                    onChange={(e) => onChange(e.target.value, e.target.name)}
                    type={type}
                    id={name}
                    name={name}
                    className='peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500' placeholder="" />
                <label
                    htmlFor={name}
                    className='absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white'>{label}</label>
            </div >
            {errorMessage && value == '' && (
                <p className='text-red-500 text-sm mt-1.5 font-light'>{errorMessage}</p>
            )}
            { errorMessage == 'These credentials do not match our records.' && value !== '' && (
                <p className='text-red-500 text-sm mt-1.5 font-light'>{errorMessage}</p>
            )}
        </div>
    )
}
