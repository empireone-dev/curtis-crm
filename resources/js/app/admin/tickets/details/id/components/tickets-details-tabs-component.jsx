import React from 'react';
import { AndroidOutlined, AppleOutlined, CommentOutlined, FileDoneOutlined, FileImageOutlined, FileProtectOutlined, FileSearchOutlined, FileSyncOutlined, FileUnknownOutlined, HomeOutlined, InteractionOutlined, ProductOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, VerticalLeftOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { router } from '@inertiajs/react';
import { setHash } from '@/app/redux/app-slice';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import FilesTile from '../tiles/files/tile';

export default function TicketsDetailsTabsComponent() {

    const { ticket } = useSelector((state) => state.tickets)
    const { hash } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const tiles = [
        {
            title: 'Files',
            icon: <FileImageOutlined className='text-xl'/>,
            components: <FilesTile />,
            hash: '0',
        },
        ...(ticket.isUploading === 'true' && ticket.call_type === 'CF-Warranty Claim' && ticket.status == null
            ? [
                {
                    title: 'Warranty Validation',
                    icon: <FileProtectOutlined className='text-xl'/>,
                    //   components: <ContentsWarrantyValidationPage />,
                    hash: '1',
                }
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.call_type === 'Parts' && (ticket.validation_notes === null || ticket.status === 'PARTS VALIDATION')
            ? [
                {
                    title: 'Parts Validation',
                    icon: <FileSyncOutlined className='text-xl'/>,
                    //   components: <TicketsPartsValidationContent />,
                    hash: '2',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'RESOURCE' && account?.role_id != 3
            ? [
                {
                    title: 'Decision Making',
                    icon: <FileUnknownOutlined className='text-xl'/>,
                    //   components: <TicketsDecisionMakingContent />,
                    hash: '3',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && (ticket.status === 'WAREHOUSE' || ticket.status === 'CLOSED')
            // && account?.role_id == 3
            ? [
                {
                    title: 'Warehouse',
                    icon: <HomeOutlined className='text-xl'/>,
                    //   components: <WarehousePage />,
                    hash: '4',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'REPAIR'
            ? [
                {
                    title: 'Repair',
                    icon: <SettingOutlined className='text-xl'/>,
                    //   components: <ContentsRepairPage />,
                    hash: '5',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'AVAILABILITY'
            ? [
                {
                    title: 'Availability',
                    icon: <FileSearchOutlined className='text-xl'/>,
                    //   components: <TicketsAvailabilityContent />,
                    hash: '6',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'INTERNALS'
            ? [
                {
                    title: 'Internals',
                    icon: <ShopOutlined className='text-xl'/>,
                    //   components: <TicketsPartsInternalsContent />,
                    hash: '7',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'CALLBACK'
            ? [
                {
                    title: 'Callback',
                    icon: <VerticalLeftOutlined className='text-xl'/>,
                    //   components: <ContentsCallBackPage />,
                    hash: '8',
                },
            ]
            : []),


        ...(ticket.isUploading === 'true' && ticket.status === 'REFUND'
            ? [
                {
                    title: 'Refund',
                    icon: <ProductOutlined className='text-xl'/>,
                    //   components: <ContentsRefundPage />,
                    hash: '9',
                },
            ]
            : []),
        ...(ticket.isUploading === 'true' && ticket.status === 'REPLACEMENT'
            ? [
                {
                    title: 'Replacement Warranty',
                    icon: <ShoppingCartOutlined className='text-xl'/>,
                    //   components: <ReplacementWarrantyPage />,
                    hash: '10',
                },
            ]
            : []),

        ...(ticket.isUploading === 'true' && ticket.status === 'REPLACEMENT PARTS'
            ? [
                {
                    title: 'Replacement Parts',
                    icon: <SettingOutlined className='text-xl'/>,
                    //   components: <ContentsReplacementPartsPage />,
                    hash: '11',
                },
            ]
            : []),

        ...(ticket.call_type == 'TS-Tech Support' && ticket.status === null
            ? [
                {
                    title: 'Update Status',
                    icon: <FileDoneOutlined className='text-xl'/>,
                    //   components:  <TicketsDetailsContentStatus />,
                    hash: '12',
                },
            ]
            : []),

        {
            title: 'Activities',
            icon: <InteractionOutlined className='text-xl'/>,
            //   components: <TicketsDetailsContentActivities />,
            hash: '13',
        },
        {
            title: 'Details',
            icon: <ProfileOutlined className='text-xl'/>,
            //   components: <TicketsDetailsContentDetails />,
            hash: '14',
        },
        {
            title: 'Agent Notes',
            icon: <CommentOutlined className='text-xl'/>,
            //   components: <TicketsDetailsContentNotes />,
            hash: '15',
        },
    ];

    function changeTabs(value) {
        dispatch(setHash(value))
        router.visit(`#${value}`)
    }

    return (
        <Tabs
            animated={false}
            size="large"
            defaultActiveKey={hash}
            onChange={(value) => changeTabs(value)}
            items={tiles.map((res, i) => {
                return {
                    key: res.hash,
                    label: res.title.toUpperCase(),
                    children: res.components,
                    icon: res.icon
                };
            })}
        />
    )
}
