import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux'

export default function ContentDetailsSection() {
  const { ticket } = useSelector((state) => state.customer_tickets)

  return (
    <div className='m-5 py-5'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Ticket Details</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6  font-medium text-gray-500">Personal details and ticket.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Full name :</b> {ticket.fname} {ticket.lname}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Email :</b> {ticket.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Phone :</b> {ticket.phone}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Purchase Date :</b> {ticket.purchase_date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Model # :</b> {ticket.item_number}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Unit :</b> {ticket.unit}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Serial # :</b> {ticket.serial_number}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Item Type :</b> {ticket.class}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 flex"><b>Issue :</b>  { ticket.issue && JSON.parse(ticket.issue).map((item, j) => {
              return (
                <div key={j} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-blue-100 bg-blue-700 border border-blue-700">
                  <div className="text-xs font-normal leading-none max-w-full flex-initial">
                    {item}
                  </div>
                </div>
              );
            })}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Resolution :</b> {ticket.call_type}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Country :</b> {ticket.country}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Zip Code / Postal :</b> {ticket.zip_code}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Address :</b> {ticket.address}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>State :</b> {ticket.state}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>City :</b> {ticket.city}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Store Name:</b> N/A</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"><b>Remarks :</b> {ticket.remarks}</dt>
            <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Explanation :</b> {ticket.explanation}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
