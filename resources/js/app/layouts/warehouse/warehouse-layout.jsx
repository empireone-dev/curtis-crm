import React, { useEffect } from 'react'
import WarehouseLayoutSubSidebarSection from './sections/warehouse-layout-sub-sidebar-section'
import WarehouseLayoutSidebarSection from './sections/warehouse-layout-sidebar-section'
import { get_user_service } from '@/app/services/user-service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/app/redux/app-slice';

export default function WarehouseLayout({ children, account }) {
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
    <div>
      <div className='flex gap-3'>
        <div className='flex-none'>
          <div className='flex sticky top-0 '>
            <WarehouseLayoutSubSidebarSection />
            <WarehouseLayoutSidebarSection account={account} />
          </div>

        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
