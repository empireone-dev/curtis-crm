import React from 'react'

export default function EmailtemplateTableComponent({name}) {
  return (
    <>
     <th scope="col" className="px-12 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {name}
            </th>
    </>
  )
}
