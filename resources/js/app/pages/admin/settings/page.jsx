import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import SettingsProfileUpdateSection from './sections/settings-profile-update-section'
import SettingsPasswordUpdateSection from './sections/settings-password-update-section'

export default function AdminSettings({ auth, mustVerifyEmail, status }) {
    return (
        <AdministratorLayout>
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <SettingsProfileUpdateSection
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                      <SettingsPasswordUpdateSection className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {/* <DeleteUserForm className="max-w-xl" /> */}
                    </div>
                </div>
            </div>

        </AdministratorLayout>
    )
}
