import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import Loading from './loading'

export default function ImageView({ files, deleteFileImage, isLoading }) {
    const [open, setOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const cancelButtonRef = useRef(null);

    function clickHandler(value, res) {
        setOpen(value);
        if (value) {
            setCurrentImageIndex(files.findIndex(file => file.id === res.id));
        }
    }

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => {
            if (prevIndex === files.length - 1) {
                return 0; 
            } else {
                return prevIndex + 1; 
            }
        });
    };

 
    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex => {
            if (prevIndex === 0) {
                return files.length - 1; 
            } else {
                return prevIndex - 1; 
            }
        });
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                handleNextImage();
            } else if (event.key === 'ArrowLeft') {
                handlePreviousImage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentImageIndex]); 

    return (
        <>
            {files.map((res, i) => (
                <li key={i} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 h-36" id={res}>
                    <article className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer text-transparent hover:text-white shadow-sm">
                        <section className="flex flex-col rounded-md text-xs w-full h-full  absolute top-0 py-2 px-3">
                            <div className="flex">
                                <button
                                    className="delete ml-auto focus:outline-none p-1 rounded-md z-10 text-red-500 hover:bg-gray-500"
                                    onClick={() => deleteFileImage(res.id, res.ticket_id)}
                                >
                                    {isLoading ? <Loading /> : <TrashIcon className='h-6 text-red-500 relative' />}
                                </button>
                            </div>
                        </section>
                        <img
                            onClick={() => clickHandler(true, res)}
                            className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                            alt="upload preview"
                            src={res?.url}
                        />
                    </article>
                </li>
            ))}
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
                                    <img src={files[currentImageIndex]?.url} className='w-full h-full' />
                                    {currentImageIndex > 0 && (
                                        <button
                                            className="prev-button absolute top-1/2 transform -translate-y-1/2 left-0 ml-2 rounded-full p-2 text-gray-600 hover:bg-gray-400"
                                            onClick={handlePreviousImage}
                                        >
                                            <svg
                                                className="fill-current w-12 h-12"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M15.17 18.36l-6-6 6-6 1.41 1.29-7.7 7.71 7.7 7.64z"/>
                                            </svg>
                                        </button>
                                    )}
                                    {currentImageIndex < files.length - 1 && (
                                        <button
                                            className="next-button absolute top-1/2 transform -translate-y-1/2 right-0 mr-2 rounded-full p-2 text-gray-600 hover:bg-gray-400"
                                            onClick={handleNextImage}
                                        >
                                            <svg
                                                className="fill-current w-12 h-12"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8.83 18.36l6-6-6-6.35 1.41-1.29 7.7 7.64-7.7 7.71z"/>
                                            </svg>
                                        </button>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
