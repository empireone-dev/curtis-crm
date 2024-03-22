import React from 'react'
import ClientLayoutSubSidebarSection from './sections/client-layout-sub-sidebar-section'
import ClientLayoutSidebarSection from './sections/client-layout-sidebar-section'

export default function ClientLayout({children,account}) {
    return (
        <div className='flex gap-3'>
            <div className='flex-none'>
                <div className='flex sticky top-0 '>
                    <ClientLayoutSubSidebarSection />
                    <ClientLayoutSidebarSection account={account}/>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
