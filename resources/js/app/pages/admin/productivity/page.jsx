import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import ProductivityTableSection from './sections/productivity-table-section'
import ProductivityTotalHandledCases from './sections/productivity-total-handled-cases'
import store from '@/app/store/store';
import { get_users_thunk } from '../users/redux/users.thunk';
import ExportExcel from './sections/export-cases-section';

export default function ProductivityPage() {

  useEffect(() => {
    store.dispatch(get_users_thunk(5))
  }, []);
  return (
    <AdministratorLayout>
      <div className="flex items-center gap-x-3 p-5">
        <h2 className="text-xl flex gap-3 font-medium text-gray-800">
          <b>Productivity</b>
          <ExportExcel />
        </h2>
      </div>
      {/* <ProductivityTotalHandledCases/> */}
      <ProductivityTableSection />
    </AdministratorLayout>
  )
}
