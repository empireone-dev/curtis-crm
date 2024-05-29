
import React from 'react'
import SettingsProfileUpdateSection from './sections/settings-profile-update-section'
import SettingsPasswordUpdateSection from './sections/settings-password-update-section'
import AgentLayout from '@/app/layouts/agent/agent-layout';

export default function AgentSettings({ auth, mustVerifyEmail, status }) {
    const account = auth.user;
    return (
        <AgentLayout
        account={account}
        >
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

        </AgentLayout>
    )
}
