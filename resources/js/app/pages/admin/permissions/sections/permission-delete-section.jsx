import Modal from '@/app/layouts/components/modal'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function PermissionDeleteSection() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button 
            onClick={()=>setOpen(true)}
            type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center"><TrashIcon className='h-6 text-white' /></button>
                     
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
