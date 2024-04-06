import React, { useEffect, useState } from 'react'
import Select from '@/app/layouts/components/select'
import Input from '@/app/layouts/components/input'
import Wysiwyg from '@/app/layouts/components/wysiwyg'
import { useSelector } from 'react-redux'

export default function ValidationFormSection() {
    const [data, setData] = useState()
    const { email_templates } = useSelector((state) => state.email_templates);

    useEffect(() => {
        setData({
            ...data,
            email_template: {
                id: 1,
                template_name: "Blank Template",
                template_text: ' '
            }
        })
    }, []);

    function formHandler(value, name) {
        const findTemplates = email_templates.find(res => res.id == value)
        setData({
            ...data,
            [name]: findTemplates
        })
    }

    return (
        <div className='flex w-full items-center justify-center'>

            <div className='max-w-7xl w-full flex flex-col gap-5'>
                <div>
                Mark this Ticket Valid / In Valid (Close)
                </div>
                <Input
                    onChange={formHandler}
                    name='notes'
                    required={true}
                    value={data?.notes}
                    label='Item notes'
                    type='text'
                    errorMessage='Item notes is required'
                />
                <Select
                    onChange={formHandler}
                    name='email_template'
                    value='waa'
                    label='Email Templates'
                    errorMessage=''
                    data={email_templates.map(res => ({
                        name: res.template_name,
                        value: res.id
                    }))}
                />
                <Wysiwyg
                    label=""
                    value={data?.email_template?.template_text ?? ' '}
                    onChange=""

                />

                <div className='flex gap-4 mt-12'>
                    <button className='p-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
                        MARK VALID - IW
                    </button>
                    <button className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                        MARK VALID - OOW
                    </button>
                    <button className='p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600'>
                        MARK INVALID 
                    </button>
                    <button className='p-2 bg-red-500 text-white rounded-md hover:bg-red-600'>
                        MARK INCOMPLETE 
                    </button>
                </div>
            </div>
        </div>

    )
}
