import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import ProductivityTableSection from './sections/productivity-table-section'
import ProductivityTotalHandledCases from './sections/productivity-total-handled-cases'

export default function ProductivityPage() {
  return (
    <AdministratorLayout>
      <div className="flex items-center gap-x-3 p-3">
        <h2 className="text-lg font-medium text-gray-800">
          <b>Dashboard</b>
        </h2>
      </div>
      <ProductivityTotalHandledCases/>
      <ProductivityTableSection />
    </AdministratorLayout>
  )
}
