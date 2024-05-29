import ASCLayout from '@/app/layouts/asc/asc-layout'
import React from 'react'
import ASCSettingsPasswordUpdateSection from './sections/settings-password-update-section'
import ASCSettingsProfileUpdateSection from './sections/settings-profile-update-section'

export default function ASCSettingsPage({ auth, mustVerifyEmail, status }) {
    const account = auth.user
  return (
    <ASCLayout
    account={account}
    >
         <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ASCSettingsProfileUpdateSection
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                      <ASCSettingsPasswordUpdateSection className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {/* <DeleteUserForm className="max-w-xl" /> */}
                    </div>
                </div>
            </div>
      </ASCLayout>
  )
}
