import React from 'react'

export default function ContentNotesCommentSection() {
  return (
    <div>
        
<ol className="relative border-s border-gray-200">                  
    <li className="mb-10 ms-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
            <img className="rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
            <div className="text-sm font-normal text-gray-500 ">Bonnie moved <a href="#" className="font-semibold text-blue-600 hover:underline">Jese Leos</a> to <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded">Funny Group</span></div>
        </div>
    </li>
    <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
            <img className="rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Thomas Lean image"/>
        </span>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="items-center justify-between mb-3 sm:flex">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
                <div className="text-sm font-normal text-gray-500 flex">Thomas Lean commented on  <a href="#" className="font-semibold text-gray-900hover:underline">Flowbite Pro</a></div>
            </div>
            <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 ">Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.</div>
        </div>
    </li>
    <li className="ms-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
            <img className="rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Jese Leos image"/>
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">1 day ago</time>
            <div className="text-sm font-normal text-gray-500 flex">Jese Leos has changed <a href="#" className="font-semibold text-blue-600 hover:underline">Pricing page</a> task status to  <span className="font-semibold text-gray-900 ">Finished</span></div>
        </div>
    </li>
</ol>


    </div>
  )
}
