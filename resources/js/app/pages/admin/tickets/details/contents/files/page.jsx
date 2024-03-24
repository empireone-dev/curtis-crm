import React from 'react'
import FilesUploadSection from './sections/files-upload-section'
import WarrantyFilesSection from './sections/warranty-files-section'

export default function TicketsDetailsContentFiles() {
  return (
    <div>
      <FilesUploadSection />  
      <WarrantyFilesSection/>
    </div>
  )
}
