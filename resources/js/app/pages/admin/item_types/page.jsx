<<<<<<< HEAD:resources/js/app/pages/item_types/page.jsx
import AdministratorLayout from '@/app/layouts/administrator-layout'
import React, { useEffect } from 'react'
import { get_item_types_thunk } from './redux/item_types-thunk';
import store from '@/app/store/store';
import ItemTypesTableSection from './sections/item-types-table-section';
=======
import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import ItemtypeTableSection from './sections/itemtypes-table-section'
>>>>>>> 050c5c960e243d87846fa2841e734548c15c60a2:resources/js/app/pages/admin/item_types/page.jsx

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
