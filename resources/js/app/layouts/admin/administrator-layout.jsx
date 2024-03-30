import React, { useEffect } from 'react'
import LayoutSidebarSection from './sections/layout-sidebar-section'
import LayoutSubSidebarSection from './sections/layout-sub-sidebar-section'
import axios from 'axios';

export default function AdministratorLayout({ children }) {
 
  return (
    <div className='flex gap-3'>
      <div className='flex-none'>
        <div className='flex sticky top-0 '>
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
