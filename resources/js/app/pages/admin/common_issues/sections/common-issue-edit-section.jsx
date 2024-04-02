import Drawer from '@/app/layouts/components/drawer'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function CommonIssueEditSection() {
    const [open, setOpen] = useState(false)
  return (
    <div>
        <button
                onClick={() => setOpen(true)}
                type="button" className=" text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center">
                <PencilSquareIcon className='h-6 text-white' />
            </button>
            <Drawer
                open={open}
                setOpen={setOpen}
                title="Edit Common Issues"
            >
                Edit Common Issues
            </Drawer>
    </div>
  )
}
