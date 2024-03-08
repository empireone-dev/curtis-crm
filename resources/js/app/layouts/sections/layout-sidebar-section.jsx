import React, { useState } from 'react';
import LayoutSidebarListComponent from '../components/layout-sidebar-list-component';
import { BriefcaseIcon, ClipboardDocumentIcon, CloudArrowDownIcon, CloudArrowUpIcon, HomeIcon, InboxArrowDownIcon, KeyIcon, PuzzlePieceIcon, ReceiptPercentIcon, ShoppingCartIcon, TicketIcon, UserCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'


export default function LayoutSidebarSection() {
  // State to track whether the sidebar is open or closed

  return (
    <>
      <div className="h-screen flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col left-0 w-64 bg-white h-screen border-r">
          <div className="flex items-center justify-center h-14 border-b">
            <div>Curtis CRM</div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              {/* <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
              </li> */}
              <LayoutSidebarListComponent
                name="Dashboard"
                icon={<HomeIcon className='h-6'/>}
                href={'dashboard'}
              />
              <LayoutSidebarListComponent
                name="Permissions"
                icon={<KeyIcon className='h-6'/>}   
                href={'permissions'}
              />
              <LayoutSidebarListComponent
                name="Roles"
                icon={<UserIcon className='h-6'/>}   
                href={'roles'}
              />
              <LayoutSidebarListComponent
                name="Users"
                icon={<UserGroupIcon className='h-6'/>}   
                href={'users'}
              />
               <LayoutSidebarListComponent
                name="Brands"
                icon={<ReceiptPercentIcon className='h-6'/>}   
                href={'brands'}
              />
              <LayoutSidebarListComponent
                name="Email Template"
                icon={<InboxArrowDownIcon className='h-6'/>}   
                href={'email_template'}
              />
              <LayoutSidebarListComponent
                name="Item Types"
                icon={<BriefcaseIcon className='h-6'/>}   
                href={'item_types'}
              />
              <LayoutSidebarListComponent
                name="Common-Issues"
                icon={<ClipboardDocumentIcon className='h-6'/>}   
                href={'common_issues'}
              />
              {/* <LayoutSidebarListComponent
                name="Products"
                icon={<ShoppingCartIcon className='h-6'/>}   
                href={'products'}
              /> */}
              <LayoutSidebarListComponent
                name="Tickets"
                icon={<TicketIcon className='h-6'/>}   
                href={'tickets'}
              />
              <LayoutSidebarListComponent
                name="ASC"
                icon={<UserCircleIcon className='h-6'/>}   
                href={'asc'}
              />
               <LayoutSidebarListComponent
                name="Bulk Upload Products"
                icon={<CloudArrowDownIcon className='h-6'/>}   
                href={'bup'}
              />
              <LayoutSidebarListComponent
                name="Exports Management"
                icon={<CloudArrowUpIcon className='h-6'/>}   
                href={'em'}
              />
               <LayoutSidebarListComponent
                name="Handled Tickets Tracker"
                icon={<PuzzlePieceIcon className='h-6'/>}   
                href={'htt'}
              />
              {/* <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Tasks</div>
                </div>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Available Tasks</span>
                </a>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Clients</span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">15</span>
                </a>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
                </div>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                </a>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                </a>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
