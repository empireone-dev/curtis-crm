import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'

export default function AgentCustomerDetailsSection({email}) {
    return (
        <div>
            <div>
                <div class="text-gray-600 mb-2 mt-4">
                    <p class="font-medium text-lg">Customer Details</p>
                </div>
                <div className='flex flex-1 w-full gap-4'>
                    {/* <div class="w-full">
                        <label for="full_name">Name</label>
                        <input type="text" value={data?.fname+' '+data?.lname} name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                    </div> */}
                    <div class="w-full">
                        <label for="full_name">Email</label>
                        <input type="text" 
                       value={email} 
                        name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                    </div>
                    {/* <div class="w-full">
                        <label for="full_name">Phone</label>
                        <input type="text" value={data?.phone} name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                    </div> */}
                </div>

            </div>
        </div>
    )
}
