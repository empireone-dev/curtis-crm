import Modal from '@/app/layouts/components/modal'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function PermissionDeleteSection() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button 
            onClick={()=>setOpen(true)}
            type="button" className=" text-red-500 font-medium rounded-lg text-sm py-2 text-center">
                <TrashIcon className='h-6' />
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Delete Permission"
            >
                Hello
            </Modal>
        </div>
    )
}
