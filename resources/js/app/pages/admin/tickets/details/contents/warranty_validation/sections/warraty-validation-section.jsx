import Input from '@/app/layouts/components/input'
import Select from '@/app/layouts/components/select'
import { store_receipt_service } from '@/app/services/receipt-service'
import { router } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTicket } from '../../../../_redux/tickets-slice'
import { get_retailers } from '@/app/services/product-search'

export default function WarratyValidationSection() {

    const { ticket } = useSelector((state) => state.tickets)
    const dispatch = useDispatch()
    const [retailers, setRetailers] = useState([])
    const [form, setForm] = useState({
        store: '',
        retailers_price: '0',
        discount: '0',
        total_price: '0',
        refurbished: 'true',
        notes: null
    })

    useEffect(() => {
        async function retailers(params) {
            const res = await get_retailers()
            setRetailers(res.map(res => ({
                name: res,
                value: res
            })))
        }
        retailers()
    }, [])
    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value
        })
    }

    async function markValidHandler() {
        const result = await store_receipt_service({
            ...ticket,
            ...form
        })
        dispatch(setTicket(result.status))
        router.visit('#decision')
    }

    function markInValidHandler() {

    }
    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='text-4xl font-black'>
                    Receipt details
                </div>
                <Select
                    onChange={formHandler}
                    name='store'
                    value={form.store}
                    label='Store Name'
                    errorMessage='Store Name is required'
                    data={retailers}
                />
                <Input
                    span={'$'}
                    onChange={formHandler}
                    name='retailers_price'
                    value={form.retailers_price}
                    label='Retailers Price'
                    type='text'
                    errorMessage='Retailers Price is required'
                />
                <Input
                    span={'$'}
                    onChange={formHandler}
                    name='discount'
                    value={form.discount}
                    label='Discount'
                    type='text'
                    errorMessage='Discount is required'
                    readOnly
                />
                <Input
                    span={'$'}
                    onChange={formHandler}
                    name='total_price'
                    value={parseFloat(form.retailers_price) - parseFloat(form.discount)}
                    label='Total Price'
                    type='text'
                    errorMessage='Total Price is required'
                    readOnly
                />
                <Select
                    onChange={formHandler}
                    name='refurbished'
                    value={form.refurbished}
                    label='Refurbished Logo?'
                    errorMessage='Refurbished is required'
                    data={[
                        {
                            value: 'true',
                            name: 'Yes'
                        },
                        {
                            value: 'false',
                            name: 'No'
                        },
                    ]}
                />
                <Input
                    onChange={formHandler}
                    name='notes'
                    value={form.notes}
                    label='Validation Notes'
                    type='text'
                    errorMessage='Validation Notes is required'
                />
                <div className='flex flex-col bg-blue-700 text-white p-3 rounded-md gap-4'>
                    <div className='text-2xl font-bold'>
                        Mark this Ticket Valid
                    </div>
                    <div>
                        <button
                            onClick={markValidHandler}
                            className='bg-white hover:bg-gray-300 text-blue-700 p-3 rounded-md font-black'>
                            MARK VALID
                        </button>
                    </div>
                </div>

                <div className='flex flex-col bg-red-600 text-white p-3 rounded-md gap-4'>
                    <div className='text-2xl font-bold'>
                        Mark this Ticket In-Valid
                    </div>
                    <div className='bg-white p-5 rounded-md text-black'>
                        REASON:
                        <Select
                            onChange={formHandler}
                            name='reason'
                            value={form.reason}
                            errorMessage='Reason is required'
                            data={[
                                {
                                    value: 'CA',
                                    name: 'Canada'
                                },
                                {
                                    value: 'US',
                                    name: 'United States'
                                }
                            ]}
                        />
                    </div>
                    <div>
                        <button
                            onClick={markInValidHandler}
                            className='bg-white hover:bg-gray-300 text-red-600 p-3 rounded-md font-black'>
                            MARK INVALID
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
