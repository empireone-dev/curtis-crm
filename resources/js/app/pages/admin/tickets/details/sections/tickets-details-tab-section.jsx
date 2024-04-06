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
    {
      title: 'Decision Making',
      components: <TicketsDecisionMakingContent />,
      hash: '#decision',
    },

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
    router.visit(tabs[index].hash);
  };
  const hash = '#' + page.url.split('#')[1]

  return (
    <div className="w-full  px-2  sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-md bg-blue-600 p-1">
          {tabs.map((res, i) => (
            <Tab
              onClick={() => handleTabClick(i)}
              key={i}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2.5 text-sm font-medium leading-5',
                  ' ',
                  hash == res.hash
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {res.title}
            </Tab>
          ))}
        </Tab.List>
        <div className='py-5'>
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
      </Tab.Group>
    </div>
  );
}
