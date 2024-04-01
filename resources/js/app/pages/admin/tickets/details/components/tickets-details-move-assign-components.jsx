import React from 'react'

export default function TicketsDetailsMoveAssignComponents({ name,icon }) {
  return (
    <div className='my-3 mx-1'>
      <button
        className="outline outline-2 flex gap-2 hover:bg-blue-500 bg-blue-600 text-white outline-offset-2 p-2.5 outline-blue-500 hover:outline-blue-700 rounded-sm">
        {icon}{name}
      </button>
    </div>
  )
}
