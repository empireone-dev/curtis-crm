import React from 'react'
import DashboardCardsComponent from '../components/dashboard-cards-component'
import { AdjustmentsHorizontalIcon, ArchiveBoxArrowDownIcon, ArrowsRightLeftIcon, AtSymbolIcon, BanknotesIcon, BookOpenIcon, CheckBadgeIcon, CheckCircleIcon, ClipboardIcon, Cog6ToothIcon, ComputerDesktopIcon, CpuChipIcon, DocumentCheckIcon, EnvelopeIcon, HomeIcon, HomeModernIcon, IdentificationIcon, ListBulletIcon, PhotoIcon, ShoppingCartIcon, TagIcon, TicketIcon, UserCircleIcon, UserGroupIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function DashboardCardsSection() {
    return (
        <div className="mt-12 mr-3">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <DashboardCardsComponent
                    title="Validation"
                    count="100"
                    icon={<ListBulletIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Parts Validation"
                    count="100"
                    icon={<AdjustmentsHorizontalIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Resouce Team"
                    count="100"
                    icon={<ArchiveBoxArrowDownIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Technical"
                    count="100"
                    icon={<WrenchScrewdriverIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Parts"
                    count="100"
                    icon={<CpuChipIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="ChatBot Tickets"
                    count="100"
                    icon={<UserCircleIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Web Forms Tickets"
                    count="100"
                    icon={<BookOpenIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="RMA Request"
                    count="100"
                    icon={<ArrowsRightLeftIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Waiting For The Photos"
                    count="100"
                    icon={<PhotoIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Refund Tickets"
                    count="100"
                    icon={<BanknotesIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="ASC Tickets"
                    count="100"
                    icon={<TicketIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Replacement For Warranty"
                    count="100"
                    icon={<TagIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Replacement For Parts"
                    count="100"
                    icon={<Cog6ToothIcon  className='h-10 text-white'/>}
                />
                 <DashboardCardsComponent
                    title="CA Warehouse"
                    count="100"
                    icon={<HomeIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="US Warehouse"
                    count="100"
                    icon={<HomeModernIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Unseen Customer Email Tickets"
                    count="100"
                    icon={<AtSymbolIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Customer Responded"
                    count="100"
                    icon={<UserGroupIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Incomplete Information"
                    count="100"
                    icon={<IdentificationIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Close Tickets"
                    count="100"
                    icon={<XMarkIcon  className='h-10 text-white'/>}
                />

                <DashboardCardsComponent
                    title="Willing To Buy"
                    count="100"
                    icon={<ShoppingCartIcon  className='h-10 text-white'/>}
                />

                <DashboardCardsComponent
                    title="Check Availability"
                    count="100"
                    icon={<CheckCircleIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Updates From Curtis"
                    count="100"
                    icon={<ComputerDesktopIcon  className='h-10 text-white'/>}
                />
                <DashboardCardsComponent
                    title="Repair Success"
                    count="100"
                    icon={<CheckBadgeIcon  className='h-10 text-white'/>}
                />

                <DashboardCardsComponent
                    title="Processed Tickets"
                    count="100"
                    icon={<ClipboardIcon  className='h-10 text-white'/>}
                />

                <DashboardCardsComponent
                    title="Direct Emails"
                    count="100"
                    icon={<EnvelopeIcon  className='h-10 text-white'/>}
                />

                <DashboardCardsComponent
                    title="ASC Completed"
                    count="100"
                    icon={<DocumentCheckIcon  className='h-10 text-white'/>}
                />
            </div>
        </div>
    )
}
