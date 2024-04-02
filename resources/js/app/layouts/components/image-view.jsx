import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function ImageView({ files }) {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const cancelButtonRef = useRef(null)

    function clickHandler(value, res) {
        setOpen(value)
            if (value) {
                setData(res)
            } else {
                setData({})
            }
    }
    return (
        <>
            {files.map((res, i) => {
                return (
                    <li
                        onClick={() => clickHandler(true, res)}
                        key={i}
                        className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 h-36"
                        id={res}
                    >
                        <article className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer text-transparent hover:text-white shadow-sm">
                            <img
                                className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                                alt="upload preview"
                                src={res?.url}
                            />
                            <section className="flex hover:bg-gray-300 flex-col rounded-md text-xs break-words w-full h-full  absolute top-0 py-2 px-3">

                                <div className="flex">
                                    <button
                                        className="delete  ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                                 onClick={() =>alert()}
                                    >
                                        <TrashIcon className='h-6 text-red-500 relative'/>
                                   
                                    </button>
                                </div>
                            </section>
                        </article>

                    </li>
                )
            })}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full max-w-6xl">
                                    <img src={data?.url} className='w-full h-full' />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
