import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function LayoutSidebarListComponent({ name, icon, href }) {
  const {url} = usePage()
  const path = url.split('/')[2]
  return (
    <Link href={route(href)}>
      <li className={`focus:outline-none  text-gray-600 ${path == href?'border-blue-500 bg-gray-200':'hover:border-blue-500 hover:text-gray-800 hover:bg-gray-50'}  border-l-4 border-transparent  pr-6`}>
        <button className="mx-2 relative flex flex-row items-center h-11 ">
          {icon}
          <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
        </button>
      </li>
    </Link>
  )
}
