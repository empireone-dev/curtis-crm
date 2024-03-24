import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import store from '@/app/store/store';
import { get_asc_thunk } from './redux/ascs-thunk';
import ASCTableSection from './sections/asc-table-section';

export default function ASCSPage() {
  const dispatch =useDispatch()
  useEffect(() => {
    store.dispatch((get_asc_thunk()))
  }, []);
  return (
    <AdministratorLayout>
      <ASCTableSection />
    </AdministratorLayout>
  )
}
