import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import ItemtypeTableSection from './sections/itemtypes-table-section'

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
