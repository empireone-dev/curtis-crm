import React, { useEffect } from 'react'
import LayoutSidebarSection from './sections/layout-sidebar-section'
import LayoutSubSidebarSection from './sections/layout-sub-sidebar-section'
import axios from 'axios';
import { get_user_service } from '@/app/services/user-service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/app/redux/app-slice';

export default function AdministratorLayout({ children }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.app);
  
  useEffect(() => {
    async function get_account() {
      const result = await get_user_service()
      dispatch(setUser(result))
    }
    if (!user.id) {
      get_account()
    }
  }, [user]);

  return (
    <div className='flex'>
      <div className='flex-none'>
        <div className='flex sticky top-0 '>
          <LayoutSubSidebarSection />
          <LayoutSidebarSection />
        </div>

      </div>
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
    </div>
  )
}
