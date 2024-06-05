import React from 'react'

export default function LogCaseSection() {
    return (
        <div>
            <div class="text-gray-600 mb-4 mt-3">
                <p class="font-medium text-lg">Log Case</p>
                <div className='flex flex-1 gap-4 mt-1'>
                    <p>Is this case a possible escalation?</p>
                    <div className='flex flex-1 justify-end gap-4'>
                        <div class="flex items-center">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 focus:ring-black-500   focus:ring-2" />
                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                        </div>
                        <div class="flex items-center">
                            <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 focus:ring-black-500 focus:ring-2" />
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                        </div>
                    </div>
                </div>

                <div class="mt-2">
                    <label>Remarks</label>
                    <textarea class="h-20 border mt-1 rounded px-4 w-full bg-gray-50" value=""></textarea>
                </div>
                <div class="md:col-span-5 mt-2">
                    <label>Case Type</label>
                    <select id="countries" class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option >Select</option>
                        <option >Regular</option>
                        <option >Escalated</option>
                    </select>
                </div>
                <div class="md:col-span-5 mt-4">
                    <label>Case Status</label>
                    <select id="countries" class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option >Select</option>
                    </select>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full mt-3">
                   Submit
                </button>



            </div>
        </div>
    )
}
