import React from 'react'
import ClientCardsComponent from '../components/client-cards-component'
import { AdjustmentsHorizontalIcon, ArchiveBoxArrowDownIcon, ArrowsRightLeftIcon, AtSymbolIcon, BanknotesIcon, BookOpenIcon, CheckBadgeIcon, CheckCircleIcon, ClipboardIcon, Cog6ToothIcon, ComputerDesktopIcon, CpuChipIcon, DocumentCheckIcon, EnvelopeIcon, HomeIcon, HomeModernIcon, IdentificationIcon, ListBulletIcon, PhotoIcon, ShoppingCartIcon, TagIcon, TicketIcon, UserCircleIcon, UserGroupIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ClientCardsSection() {
    return (
        <div className="mt-12 mr-3">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <ClientCardsComponent
                    title="Need Information"
                    count="100"
                    icon={<ListBulletIcon className='h-10 text-white' />}
                />
                <ClientCardsComponent
                    title="Valid Tickets"
                    count="100"
                    icon={<AdjustmentsHorizontalIcon className='h-10 text-white' />}
                />
                <ClientCardsComponent
                    title="Invalid Tickets"
                    count="100"
                    icon={<ArchiveBoxArrowDownIcon className='h-10 text-white' />}
                />
                <ClientCardsComponent
                    title="Upload Complete"
                    count="100"
                    icon={<WrenchScrewdriverIcon className='h-10 text-white' />}
                />

            </div>
        </div>
    )
}
