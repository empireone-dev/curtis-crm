import Input from '@/app/layouts/components/input'
import Textarea from '@/app/layouts/components/textarea'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ContentRepairFormection() {
    const [form, setForm] = useState({})
    const { ticket } = useSelector((state) => state.tickets)


    useEffect(() => {
        setForm(ticket.decision_making)
    }, []);


    function formHandler(value, name) {
        if (name === 'repair_cost') {
            setForm({
                ...form,
                repair_cost: value.replace(/[^0-9.]/g, '')
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
            <div>
               ASC Name: {ticket.asc?.name ??'None'}
            </div>
            <div>
              Address: {ticket.asc?.address ??''}, {ticket.asc?.city ??''}, {ticket.asc?.state ??''},  {ticket.asc?.zip_code ??''} Canada
            </div>
            <div>
               Email: {ticket.asc?.email ??''}
            </div>
            <div>
               Phone: {ticket.asc?.phone ??''}
            </div>
            <Input
                onChange={formHandler}
                name='repair_cost'
                required={true}
                value={form?.repair_cost ?? ' '}
                label='Repair Cost'
                type='text'
                errorMessage='Repair Cost is required'
            />
            <Textarea
                required={true}
                onChange={formHandler}
                name='notes'
                value={form?.notes ?? ' '}
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
