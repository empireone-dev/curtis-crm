import store from '@/app/store/store';
import React, { useEffect } from 'react'
import { get_item_types_thunk } from './redux/item_types-thunk';
import AdministratorLayout from '@/app/layouts/admin/administrator-layout';
import ItemTypesTableSection from './sections/item-types-table-section';

export default function ItemTypesPage() {
  useEffect(() => {
    store.dispatch(get_item_types_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <ItemTypesTableSection />
    </AdministratorLayout>
  )
}
