import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { Button, Modal } from "antd";
import { Radio } from "antd";

export default function TicketDateFilter({ data, setData }) {
    const { RangePicker } = DatePicker;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeData = (value) => {
        if (value) {
            const start = value[0]?.format("YYYY-MM-DD");
            const end = value[1]?.format("YYYY-MM-DD");
            setData({
                ...data,
                start: start,
                end: end,
            });
        } else {
            setData({
                ...data,
                start: null,
                end: null,
            });
        }
    };
    const dateFormat = "YYYY/MM/DD";

    function handleChangeDateStatus(e) {
        setData({
            ...data,
            date_status: e.target.value,
        });
    }
    return (
        <div>
            <Button
                size="large"
                className="w-full"
                type="primary"
                onClick={showModal}
            >
                Date Filter
            </Button>
            <Modal
                footer={false}
                title="Date Filter"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex w-full flex-col gap-3">
                    <Radio.Group
                        onChange={handleChangeDateStatus}
                        value={data.date_status}
                    >
                        <Radio value={'Validation Date'}>Validation Date</Radio>
                        <Radio value={'Last Updated'}>Last Updated</Radio>
                        <Radio value={'Date Created'}>Date Created</Radio>
                    </Radio.Group>
                    <RangePicker
                        className="w-full"
                        defaultValue={
                            data.start && data.end
                                ? [
                                      dayjs(data.start, dateFormat),
                                      dayjs(data.end, dateFormat),
                                  ]
                                : undefined
                        }
                        onChange={handleChangeData}
                        size="large"
                    />
                </div>
            </Modal>
        </div>
    );
}
