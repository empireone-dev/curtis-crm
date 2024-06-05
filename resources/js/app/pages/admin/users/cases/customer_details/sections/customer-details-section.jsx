import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'

export default function CustomerDetailsSection() {
    return (
        <div>
            <div>
                <div class="text-gray-600 mb-2 mt-4">
                    <p class="font-medium text-lg">Customer Details</p>
                </div>
                <div className='flex flex-1 w-full gap-4'>
                    <div class="w-full">
                        <label for="full_name">Name</label>
                        <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>
                    <div class="w-full">
                        <label for="full_name">Name</label>
                        <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>
                    <div class="w-full">
                        <label for="full_name">Name</label>
                        <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>
                </div>

            </div>
        </div>
    )
}
