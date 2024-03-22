import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import BrandTableSection from './sections/brand-table-section'
import store from '@/app/store/store';
import { get_brands_thunk } from './redux/brands-thunk';

export default function BrandsPage() {
  useEffect(() => {
    store.dispatch(get_brands_thunk())
  }, []);
  return (
    <AdministratorLayout>
        <BrandTableSection/>
    </AdministratorLayout>
  )
}
