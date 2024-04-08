import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import TicketsDetailsContentFiles from '../contents/files/page';
import TicketsDetailsContentActivities from '../contents/activities/page';
import TicketsDetailsContentStatus from '../contents/status/page';
import TicketsDetailsContentDetails from '../contents/details/page';
import TicketsDetailsContentNotes from '../contents/notes/page';
import { router, usePage } from '@inertiajs/react';
import TicketsDecisionMakingContent from '../contents/decision_making/page';
import TicketsValidationContent from '../contents/validation/page';
import store from '@/app/store/store'
import { get_upload_ticket_files_thunk } from '@/app/pages/customer/tickets/redux/customer-tickets-thunk'
import { setFilesData } from '@/app/pages/customer/tickets/redux/customer-tickets-slice'
import { useDispatch, useSelector } from 'react-redux';
import { get_tickets_by_ticket_id } from '@/app/services/tickets-service';
import { setTicket } from '../../_redux/tickets-slice';
import { TicketIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
// tech support = files,activities,details,agent 
//parts = files,activities details agent
//waranty = files,activities details and agent notes
export default function TicketsDetailsTabSection() {

  const { ticket } = useSelector((state) => state.tickets)
  const { url } = usePage()
  const page = usePage();
  const dispatch = useDispatch()
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await store.dispatch(get_upload_ticket_files_thunk(url.split('/')[url.split('/').length - 1].split('#')[0]));
        const ress = await get_tickets_by_ticket_id(url.split('/')[url.split('/').length - 1].split('#')[0])
        dispatch(setTicket(ress))
        dispatch(setFilesData(res))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [url]);


  const tabs = [
    {
      title: 'Files',
      components: <TicketsDetailsContentFiles />,
      hash: '#files', // Update only the first hash dynamically
    },
    ...(ticket.isUploading === 'true' && ticket.status === null
      ? [
        {
          title: 'Validation',
          components: <TicketsValidationContent />,
          hash: '#validation',
        }
      ]
      : []),
    {
      title: 'Activities',
      components: <TicketsDetailsContentActivities />,
      hash: '#activities',
    },
    ...(ticket.isUploading === 'true' && ticket.status === 'RESOURCE'
      ? [
        {
          title: 'Decision Making',
          components: <TicketsDecisionMakingContent />,
          hash: '#decision',
        },
      ]
      : []),

    {
      title: 'Update Status',
      components: <TicketsDetailsContentStatus />,
      hash: '#status',
    },
    {
      title: 'Details',
      components: <TicketsDetailsContentDetails />,
      hash: '#details',
    },
    {
      title: 'Agent Notes',
      components: <TicketsDetailsContentNotes />,
      hash: '#notes',
    },
  ];

  const handleTabClick = (index) => {
    // Update only the first hash dynamically based on the selected tab
    // setFirstHash(tabs[index].hash.split('#')[0]);
    // Visit the URL with the updated hash
    setOpenTab(index)
    router.visit(tabs[index].hash);
  };
  const hash = '#' + page.url.split('#')[1]

  return (
    <div className="bg-gray-100 font-sans ">
      <div className="px-8">
        <div className="w-full ">
          <div className='py-3 text-3xl font-black flex gap-3 text-blue-600'>
            <TicketIcon className='h-9'/> {ticket.status??'Open Ticket'} ({ticket.call_type})
          </div>
          <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg border-blue-500 border-2 ">
            {tabs.map((res, i) => (
              <button key={i} onClick={() => handleTabClick(i)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${hash == res.hash ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>
                {res.title}
              </button>

            ))}
          </div>
          {tabs.map((res, i) => {
            return (
              <div
                key={i}
                className={classNames('rounded-xl bg-white ', '')}
              >
                {hash == res.hash && page.url.split('#')[1] && res.components}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
