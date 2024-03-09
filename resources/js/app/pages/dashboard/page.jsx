import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import DashboardCardsSection from './sections/dashboard-cards-section'

export default function DashboardPage() {
  return (
    <AdministratorLayout>
     <DashboardCardsSection />
    </AdministratorLayout>
  )
}
