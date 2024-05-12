import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_user_service } from '@/app/services/user-service';
import { setUser } from '@/app/redux/app-slice';
import AgentLayoutSubSidebarSection from './sections/agent-layout-sub-sidebar-section';
import AgentLayoutSidebarSection from './sections/agent-layout-sidebar-section';

export default function AgentLayout({children,account}) {

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
        <div className='flex gap-3'>
            <div className='flex-none'>
                <div className='flex sticky top-0 '>
                    <AgentLayoutSubSidebarSection />
                    <AgentLayoutSidebarSection account={account}/>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
