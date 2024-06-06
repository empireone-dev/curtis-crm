import React, { useState } from 'react';

export default function ProductivityTotalHandledCases() {
    const [isTodaySelected, setIsTodaySelected] = useState(true);

    const handleTodayClick = () => {
        setIsTodaySelected(true);
    };

    const handleMonthClick = () => {
        setIsTodaySelected(false);
    };

    return (
        <div>
            <div className='flex justify-center items-center mb-4 '>
                <div className="w-full max-w-md rounded flex flex-col ">
                    <div className="shadow rounded-full h-8 flex p-2 relative items-center justify-center pb-2 border-solid border-2 border-slate-700">
                        <div className="w-96 flex justify-center">
                            <button className={`${isTodaySelected ? ' w-full text-white' : ''}`} onClick={handleTodayClick}>Today</button>
                        </div>
                        <div className="w-96 flex justify-center">
                            <button className={`${!isTodaySelected ? ' w-full text-white' : ''}`} onClick={handleMonthClick}>This Month</button>
                        </div>
                        <span
                            className={`elSwitch bg-indigo-600 shadow text-white flex items-center justify-center w-1/2 rounded-full h-8 transition-all ${isTodaySelected ? 'left-0 ' : 'left-[222px]'} absolute`}
                            onClick={isTodaySelected ? handleTodayClick : handleMonthClick}>
                            {isTodaySelected ? 'Today' : 'This Month'}
                        </span>

                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                    <div className="text-center p-2 rounded-full bg-green-600 text-white">
                        <span className="text-xl font-bold">
                            25
                        </span>
                    </div>
                    <p className="text-center">Total Handled Cases</p>
                </div>
            </div>
        </div>
    );
}
