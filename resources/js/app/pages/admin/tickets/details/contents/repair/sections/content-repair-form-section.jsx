import Input from '@/app/layouts/components/input'
import Textarea from '@/app/layouts/components/textarea'
import React, { useState } from 'react'

export default function ContentRepairFormection() {
    const [form, setForm] = useState({})

    function formHandler(value, name) {

        if (name === 'cost') {
            setForm({
                ...form,
                cost: value.replace(/[^0-9.]/g, '')
            })
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }

    }

    function submit_repaired_asc(params) {
        
    }

    function submit_not_repaired_asc(params) {
        
    }
    return (
        <div className='flex flex-col gap-6'>
            <Input
                onChange={formHandler}
                name='cost'
                required={true}
                value={form.cost ?? ' '}
                label='cost'
                type='text'
                errorMessage='cost is required'
            />
            <Textarea
                required={true}
                onChange={formHandler}
                name='notes'
                value={form.notes ?? ' '}
                label='notes'
                type='text'
                errorMessage='notes is required'
            />
            <div className='flex gap-4'>
                <button 
                onClick={submit_repaired_asc}
                className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>
                    REPAIRED
                </button>
                
                <button
                onClick={submit_not_repaired_asc}
                className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-md'>
                    NOT REPAIRED
                </button>
            </div>
        </div>
    )
}
