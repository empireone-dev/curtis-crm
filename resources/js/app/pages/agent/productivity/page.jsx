
import React, { useEffect } from 'react'
import ProductivityTableSection from './sections/productivity-table-section'
import ProductivityTotalHandledCases from './sections/productivity-total-handled-cases'
import store from '@/app/store/store';
import { get_users_thunk } from '../../admin/users/redux/users.thunk';
import AgentLayout from '@/app/layouts/agent/agent-layout';

export default function ProductivityPage({auth}) {

  const account = auth.user;
  useEffect(() => {
    store.dispatch(get_users_thunk(5))
  }, []);
  return (
    <AgentLayout  account={account}>
      <div className="flex items-center gap-x-3 p-5">
        <h2 className="text-xl font-medium text-gray-800">
          <b>Productivity</b>
        </h2>
      </div>
      {/* <ProductivityTotalHandledCases/> */}
      <ProductivityTableSection />
    </AgentLayout>
  )
}
