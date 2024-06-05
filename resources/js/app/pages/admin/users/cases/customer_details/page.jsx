import React from 'react'
import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import CustomerDetailsSection from './sections/customer-details-section'
import RecordDetailsSection from './sections/record-details-section'
import CaseLogsSection from './sections/case-logs-section'
import LogCaseSection from './sections/log-case-section'
import CaseDetailsSection from './sections/case-details-section'

export default function UserCasesCustomerDetailsPage() {
  return (
    <AdministratorLayout>
      <div className="p-5 md:p-10 bg-gray-100">
        <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 md:p-4">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2">
                  <CustomerDetailsSection />
                  <RecordDetailsSection />
                  <CaseLogsSection />
                </div>
                <div className="border-l p-2 md:pl-4 overflow-auto">
                  <div className="flex gap-4">
                    <button className="bg-gray-300 hover:bg-gray-400 items-center justify-center font-bold w-full py-2 px-4 rounded">
                      <ArrowLeftOutlined className="mr-2" />
                      Previous
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 items-center justify-center font-bold w-full py-2 px-4 rounded">
                      Next
                      <ArrowRightOutlined className="ml-2" />
                    </button>
                  </div>
                  <LogCaseSection/>
                  <CaseDetailsSection/>
                </div>
              </div>
            </div>
        </div>
      </div>
    </AdministratorLayout>
  )
}
