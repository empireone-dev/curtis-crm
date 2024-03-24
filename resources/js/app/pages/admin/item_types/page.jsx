import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import ItemtypeTableSection from './sections/itemtypes-table-section'
import store from '@/app/store/store';
import { get_item_types_thunk } from './redux/item_types-thunk';

export default function ItemTypesPage() {
  useEffect(() => {
    store.dispatch(get_item_types_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <ItemtypeTableSection />
    </AdministratorLayout>
  )
}
