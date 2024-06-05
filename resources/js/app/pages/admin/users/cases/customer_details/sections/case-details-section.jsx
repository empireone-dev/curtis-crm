import { Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';

export default function CaseDetailsSection() {
    const { users } = useSelector((state) => state.users);
    const ticket_id = window.location.pathname.split('/')[6]
    
    
    return (
        <div>
            <div class="text-gray-600 mb-2">
                <p class="font-medium text-lg">Case Details</p>
            </div>
            <h1><b>Currently assigned to:</b> Regine</h1>
            <div class="md:col-span-5 mt-3">
                <label>Reassigned to</label>
                <select id="countries" class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option disabled selected>Select</option>
                    {
                        users.map((res,i)=>{
                            return  <option value={res.id}>{res.name}</option>
                        })
                    }
                </select>
            </div>
            <Button type='primary' className='my-3 w-full' danger>
            Reassign
            </Button>
        </div>
    )
}
