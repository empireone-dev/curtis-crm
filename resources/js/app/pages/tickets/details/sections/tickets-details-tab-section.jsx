import { useState } from 'react'
import { Tab } from '@headlessui/react'
import TicketsDetailsContentFiles from '../contents/files/page'
import TicketsDetailsContentActivities from '../contents/activities/page'
import TicketsDetailsContentStatus from '../contents/status/page'
import TicketsDetailsContentDetails from '../contents/details/page'
import TicketsDetailsContentNotes from '../contents/notes/page'
import TicketsDetailsContentHistory from '../contents/history/page'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TicketsDetailsTabSection() {
    let [categories] = useState({
        Recent: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Trending: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })

    const tabs = [
        {
            title: 'Files',
            components: <TicketsDetailsContentFiles />
        },
        {
            title: 'Activities',
            components: <TicketsDetailsContentActivities />
        },
        {
            title: 'Update Status',
            components:<TicketsDetailsContentStatus />
        },
        {
            title: 'Details',
            components:<TicketsDetailsContentDetails />
        },
        {
            title: 'Agent Notes',
            components: <TicketsDetailsContentNotes />
        },
        {
            title: 'History Logs',
            components: <TicketsDetailsContentHistory />
        }
    ]
    return (
        <div className="w-full  px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-md bg-blue-500 p-1">
                    {tabs.map((res, i) => (
                        <Tab
                            key={i}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-md py-2.5 text-sm font-medium leading-5',
                                    ' ',
                                    selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {res.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {tabs.map((res, i) => {
                        return (
                            <Tab.Panel
                                key={i}
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    ''
                                )}
                            >
                                {res.components}
                            </Tab.Panel>
                        )
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
