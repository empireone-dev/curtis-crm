import React from 'react'
import CustomerLayoutSubSidebarSection from './sections/customer-layout-sub-sidebar-section'
import CustomerLayoutSidebarSection from './sections/customer-layout-sidebar-section'

export default function CustomerLayout({children,account}) {
    return (
        <div className='flex gap-3'>
            <div className='flex-none'>
                <div className='flex sticky top-0 '>
                    <CustomerLayoutSubSidebarSection />
                    <CustomerLayoutSidebarSection account={account}/>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
