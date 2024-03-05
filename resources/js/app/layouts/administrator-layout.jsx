import React from 'react'
import LayoutSidebarSection from './sections/layout-sidebar-section'

export default function AdministratorLayout({children}) {
  return (
    <div className='flex gap-3'>
      <div className='flex-none'>
      <LayoutSidebarSection />
      </div>
      <div className="flex-1">
      {children}
      </div>
    </div>
  )
}
