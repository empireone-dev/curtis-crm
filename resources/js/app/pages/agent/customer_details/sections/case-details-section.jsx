import React from 'react'

export default function CaseDetailsSection() {
    return (
        <div>
            <div class="text-gray-600 mb-2">
                <p class="font-medium text-lg">Case Details</p>
            </div>
            <h1><b>Currently assigned to:</b> Regine</h1>
            <div class="md:col-span-5 mt-3">
                <label>Reassigned to</label>
                <select id="countries" class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option disabled >Select</option>
                    {/* <option value="US">Regular</option>
                    <option value="CA">Escalated</option> */}
                </select>
            </div>
            <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md w-full mt-3">
                Reassign
            </button>
        </div>
    )
}
