import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import axios from 'axios';
import React,{useEffect} from 'react'

export default function ProductPage() {

  useEffect( () => {

    async function getExcel(params) {
      try {
      
        // export-excel/{spreadsheetId}/{range}/{fileName}')
        const response = await axios.get('/api/google-sheets/11tds5mFC_AFWpSjVso01SWCLQ99gbCS0shJP6jr7Hb0/10');
        // Handle the response, e.g., show a success message
        // console.log('response',JSON.parse(response.data))
        console.log(response.data)
      } catch (error) {
        console.error('Error exporting to Excel', error);
      }
    }
    getExcel()
  }, []);
  return (
    <AdministratorLayout>

    </AdministratorLayout>
  )
}
