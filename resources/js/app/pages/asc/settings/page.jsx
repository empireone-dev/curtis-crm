import ASCLayout from '@/app/layouts/asc/asc-layout'
import React from 'react'

export default function ASCSettingsPage({auth}) {
    const account = auth.user
  return (
    <ASCLayout
    account={account}
    >ASCSettingsPage</ASCLayout>
  )
}
