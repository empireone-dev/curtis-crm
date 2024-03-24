import React from 'react'

export default function ContentNotesTextareaSection() {
    return (
        <div className='my-3'>

            <form>
                <label for="chat" className="sr-only">Your message</label>
                <div className="flex flex-col items-end p-3 rounded-lg  py-6 ">

                    <textarea id="chat" rows="3" className="block mx-4 p-3  w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
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
