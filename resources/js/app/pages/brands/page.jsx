import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import BrandTableSection from './sections/brand-table-section'

export default function BrandsPage() {
  return (
    <AdministratorLayout>
        <BrandTableSection/>
    </AdministratorLayout>
  )
}
