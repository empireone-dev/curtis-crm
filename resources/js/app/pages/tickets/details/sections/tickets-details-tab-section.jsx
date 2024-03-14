import { useState } from 'react';
import { Tab } from '@headlessui/react';
import TicketsDetailsContentFiles from '../contents/files/page';
import TicketsDetailsContentActivities from '../contents/activities/page';
import TicketsDetailsContentStatus from '../contents/status/page';
import TicketsDetailsContentDetails from '../contents/details/page';
import TicketsDetailsContentNotes from '../contents/notes/page';
import TicketsDetailsContentHistory from '../contents/history/page';
import { router, usePage } from '@inertiajs/react';
import TicketsDecisionMakingPage from '../contents/decision_making/page';
import TicketsDecisionMakingContent from '../contents/decision_making/page';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TicketsDetailsTabSection() {
  const page = usePage();
  const [firstHash, setFirstHash] = useState('#files'); // Set the default first hash

  const tabs = [
    {
      title: 'Files',
      components: <TicketsDetailsContentFiles />,
      hash: '#files', // Update only the first hash dynamically
    },
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
    {
      title: 'History Logs',
      components: <TicketsDetailsContentHistory />,
      hash: '#logs',
    },
  ];

  const handleTabClick = (index) => {
    // Update only the first hash dynamically based on the selected tab
    setFirstHash(tabs[index].hash.split('#')[0]);
    // Visit the URL with the updated hash
    router.visit(tabs[index].hash);
  };
 const hash = '#'+page.url.split('#')[1]

  return (
    <div className="w-full  px-2 py-6 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-md bg-blue-500 p-1">
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
        {tabs.map((res, i) => {
            return (
              <div
                key={i}
                className={classNames('rounded-xl bg-white p-3', '')}
              >
                {hash == res.hash && page.url.split('#')[1] && res.components}
              </div>
            );
          })}
      </Tab.Group>
    </div>
  );
}
