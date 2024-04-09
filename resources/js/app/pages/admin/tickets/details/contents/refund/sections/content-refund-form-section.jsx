import Input from '@/app/layouts/components/input'
import Textarea from '@/app/layouts/components/textarea'
import React, { useState } from 'react'

export default function ContentRefundFormSection() {
    const [form, setForm] = useState({})


    function formHandler(value, name) {

        if (name === 'cost') {
            dispatch(setForm({
                ...form,
                cost: value.replace(/[^0-9.]/g, '')
            }))
        } else {
            dispatch(setForm({
                ...form,
                [name]: value
            }))
        }

    }
    return (
        <div className='flex flex-col gap-8'>
            <div class="grid grid-cols-4 gap-4">
                <Input
                    onChange={formHandler}
                    name='retailers_price'
                    required={true}
                    value={form.retailers_price ?? ' '}
                    label="Retailer's Price"
                    type='retailers_price'
                    errorMessage='Retailers Price is required'
                />
                <Input
                    onChange={formHandler}
                    name='discount'
                    required={true}
                    value={form.discount ?? ' '}
                    label='discount'
                    type='text'
                    errorMessage='Discount is required'
                />
                <Input
                    onChange={formHandler}
                    name='price_after_discount'
                    required={true}
                    value={form.price_after_discount ?? ' '}
                    label='Price After Discount'
                    type='text'
                    errorMessage='Price After Discount is required'
                />
                <Input
                    onChange={formHandler}
                    name='estimated_cost_of_refund'
                    required={true}
                    value={form.estimated_cost_of_refund ?? '0'}
                    label='Estimated Cost of Refund'
                    type='text'
                    errorMessage='Estimated Cost of Refund is required'
                />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <Input
                    onChange={formHandler}
                    name='cheque_number'
                    required={true}
                    value={form.cheque_number ?? '0'}
                    label='Cheque Number'
                    type='text'
                    errorMessage='Cheque Number is required'
                />
                <Input
                    onChange={formHandler}
                    name='chequer_amount'
                    required={true}
                    value={form.chequer_amount ??'0'}
                    label='Cheque Amount'
                    type='text'
                    errorMessage='Cheque Amount is required'
                />
            </div>
            <Textarea
                required={true}
                onChange={formHandler}
                name='notes'
                value={form.notes ?? ' '}
                label='Resource Notes:'
                type='text'
                errorMessage='notes is required'
            />
        </div>
    )
}
