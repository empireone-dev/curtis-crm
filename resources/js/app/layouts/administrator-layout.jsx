import React from 'react'
import LayoutSidebarSection from './sections/layout-sidebar-section'
import LayoutSubSidebarSection from './sections/layout-sub-sidebar-section'

export default function AdministratorLayout({ children }) {
  return (
    <div className='flex gap-3'>
      <div className='flex-none'>
        <div className='flex'>
          <LayoutSubSidebarSection />
          <LayoutSidebarSection />
        </div>

      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
