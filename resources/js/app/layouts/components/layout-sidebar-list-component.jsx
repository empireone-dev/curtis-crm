import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function LayoutSidebarListComponent({ name, icon, href }) {
  const {component  } = usePage()
  const path =component.split('/')[0]
  
  return (
    <Link href={route(href)}>
      <li className={`focus:outline-none  text-gray-600 ${path == href?'border-blue-500 bg-blue-200':'hover:border-blue-500 hover:text-gray-800 hover:bg-gray-50  border-transparent'}  border-l-4  pr-6`}>
        <button className="mx-2 relative flex flex-row items-center h-11 ">
          {icon}
          <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
        </button>
      </li>
    </Link>
  )
}
