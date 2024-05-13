import React from "react";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";
import CurtisSettingsProfileUpdateSection from "./sections/settings-profile-update-section";
import CurtisSettingsPasswordUpdateSection from "./sections/settings-password-update-section";

export default function CurtisSettingsPage({ auth, mustVerifyEmail, status }) {
    const account = auth.user;
    return (
        <CurtisLayout account={account}>
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CurtisSettingsProfileUpdateSection
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CurtisSettingsPasswordUpdateSection className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {/* <DeleteUserForm className="max-w-xl" /> */}
                    </div>
                </div>
            </div>
        </CurtisLayout>
    );
}
