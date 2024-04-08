
import store from '@/app/store/store'
import React, { useState } from 'react'
import { add_notes_on_tickets_thunk } from '../../../../_redux/tickets-thunk'

export default function ContentNotesTextareaSection() {
    const [data,setData]=useState('')

   async function addNotes(e) {
        e.preventDefault()
         store.dispatch(add_notes_on_tickets_thunk(data))
    }
    return (
        <div className='my-3'>

            <form onSubmit={addNotes}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex flex-col items-end p-3 rounded-lg ">

                    <textarea 
                    onChange={(e)=>setData(e.target.value)}
                    id="chat" rows="3" className="block mx-4 p-3  w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message...">
                        {data}
                    </textarea>
                    <div className="flex items-center justify-between px-3 py-2 ">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                            POST COMMENT
                        </button>

                    </div>
                </div>

            </form>

        </div>
    )
}
