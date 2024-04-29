import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import store from '@/app/store/store';
import { get_asc_thunk } from './redux/asc-thunk';
import ASCTableSection from './sections/asc-table-section';

export default function ASCSPage() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      await store.dispatch((get_asc_thunk()))
      setLoading(false)
    }
    loadData()
  }, [loading]);
  return (
    <AdministratorLayout>
      <ASCTableSection />
    </AdministratorLayout>
  )
}
