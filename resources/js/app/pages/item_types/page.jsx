import AdministratorLayout from '@/app/layouts/administrator-layout'
import React, { useEffect } from 'react'
import store from '@/app/store/store';
import ItemTypesTableSection from './sections/item-types-table-section';
import { get_item_types_thunk } from '../admin/item_types/redux/item_types-thunk';


export default function ItemTypesPage() {
  useEffect(() => {
    store.dispatch(get_item_types_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <ItemTypesTableSection/>
    </AdministratorLayout>
  )
}
