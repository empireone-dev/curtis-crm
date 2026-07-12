import Modal from '@/app/__components/modal';
import Button from '@/app/_components/button';
import Checkbox from '@/app/_components/checkbox';
import Textarea from '@/app/_components/textarea';
import { manual_send_lacking_information_service } from '@/app/services/send-email-service';
import { message } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SendManualLackingInformation() {
    const [open, setOpen] = useState(false);

    // 1. Destructure formState to get isSubmitting
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting }
    } = useForm();

    const lacking_informations = [
        { label: "Readable Serial Number", value: "readable_serial_section" },
        { label: "Bill of Sale / Purchase Receipt", value: "bill_of_sale" },
        { label: "Photo or Video of the Defect", value: "defect_issue" }
    ];

    // 2. Make onSubmit async! This is required for isSubmitting to work automatically.
    const onSubmit = async (data) => {
        try {
            const lackingFilesArray = Object.keys(data).filter(key => data[key] === true);
            const formData = {
                ticket_id: window.location.pathname.split('/')[4],
                lackings: lackingFilesArray,
                notes: data.notes
            }
            await manual_send_lacking_information_service(formData)
            message.success('Lacking information has been sent!')
            setOpen(false);
            reset();
        } catch (error) {

        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                Send Lacking Information
            </Button>

            <Modal
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    reset();
                }}
                title="Send Lacking Information"
                width="max-w-2xl h-max"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 py-4 mx-3">
                        {lacking_informations.map((res, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    label={res.label}
                                    {...register(res.value)}
                                    onChange={(e) => setValue(res.value, e.target.checked)}
                                />
                            );
                        })}
                        <Textarea
                            {...register('notes', { required: true })}
                            label="Notes"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button type="button" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>

                        {/* 3. Update the submit button to use isSubmitting */}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Email'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}