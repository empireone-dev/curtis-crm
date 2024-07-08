import React from 'react'

export default function RecordDetailsSection({data}) {
    return (
        <div>
            <div>
                <div class="text-gray-600 mb-2 mt-4">
                    <p class="font-medium text-lg">Record Details</p>
                </div>
                <div class="md:col-span-5">
                    <label>Case File No.</label>
                    <input type="text" class="h-10 border mt-1 mb-2 rounded px-4 w-full bg-gray-50" value={data?.ticket_id}/>
                </div>
                <div className='flex flex-1 gap-4 w-full mb-2'>
                    <div class="w-full">
                        <label>Model No.</label>
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.class} />
                    </div>
                    <div class="w-full">
                        <label>Brand</label>
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.brand}/>
                    </div>
                </div>
                <div className='flex flex-1 gap-4 w-full mb-2'>
                    <div class="w-full">
                        <label>Unit</label>
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.unit}/>
                    </div>
                    <div class="w-full">
                        <label>Serial No.</label>
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.serial_number}/>
                    </div>
                </div>
                <div class="md:col-span-5">
                    <label>Fault</label>
                    <input type="text" class="h-10 border mt-1 mb-2 rounded px-4 w-full bg-gray-50" value={data?.issue}/>
                </div>
                <div class="md:col-span-5">
                    <label>Comments (CSR)</label>
                    <textarea class="h-20 border mt-1 mb-2 rounded px-4 w-full bg-gray-50"value={data?.remarks}></textarea>
                </div>
            </div>
        </div>
    )
}
