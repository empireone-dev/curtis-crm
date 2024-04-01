import Drawer from '@/app/layouts/components/drawer'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function PermissionEditSection() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button" className=" text-blue-500 font-medium rounded-lg text-sm py-2 text-center">
                <PencilSquareIcon className='h-6 ' />
            </button>
            <Drawer
                open={open}
                setOpen={setOpen}
                title="Edit Permission"
            >
                Hello
            </Drawer>
        </div>
    )
}
