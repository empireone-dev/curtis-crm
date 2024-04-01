import React, { useState, useRef } from 'react';

const CustomerTicketsFrontOfTheUnitSection = () => {
    const [files, setFiles] = useState([])
    const overlay = document.getElementById('overlay');
    const galleryRef2 = useRef(null);

    const addFile = (file) => {
        const isImage = file.type.match('image.*');
        const objectURL = URL.createObjectURL(file);

        setFiles((prevFiles) => [...prevFiles, { objectURL, file }]);
        overlay.classList.remove('draggedover');
    };

    const handleDelete = (target) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.objectURL !== target));
    };

    const hasFiles = (e) => e.dataTransfer.types.indexOf('Files') > -1;

    const dropHandler = (e) => {
        e.preventDefault();
        for (const file of e.dataTransfer.files) {
            addFile(file);
        }
    };

    const dragEnterHandler = (e) => {
        e.preventDefault();
        if (hasFiles(e)) {
            overlay.classList.add('draggedover');
        }
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        overlay.classList.remove('draggedover');
    };

    const dragOverHandler = (e) => {
        if (hasFiles(e)) {
            e.preventDefault();
        }
    };

    const handleClick = () => {
        document.getElementById('hidden-input2').click();
    };

    const handleFileChange = (e) => {
        for (const file of e.target.files) {
            addFile(file);
        }
    };

    const handleSubmit = () => {
        alert(`Submitted Files:\n${JSON.stringify(files)}`);
        console.log(files);
    };

    const handleCancel = () => {
        setFiles([]);
    };

    return (
        <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragEnter={dragEnterHandler}
        >
            <section className="h-full w-full flex flex-col">
                <div className='text-xl font-black'>
                A clear picture of the front of the unit
                </div>
                <div className='text-gray-400'>
                for TVs, a full frontal picture while the tv is turned on.
                 

                </div>
                
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">To Upload</h1>

                <ul id="gallery" className="flex flex-1 flex-wrap -m-1" ref={galleryRef2}>

                    {files.map(({ objectURL, file }) => (
                
                            <li
                                key={objectURL}
                                className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 h-36"
                                id={objectURL}
                            >
                                <article className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer text-transparent hover:text-white shadow-sm">
                                    <img
                                        className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                                        alt="upload preview"
                                        src={objectURL}
                                    />
                                    <section className="flex hover:bg-gray-300 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                                        <h1 className="flex-1 ">{file.name}</h1>
                                        <div className="flex">
                                            <span className="p-1">
                                                <i></i>
                                            </span>
                                            <p className="p-1 size text-xs">
                                                {file.size > 1024
                                                    ? file.size > 1048576
                                                        ? Math.round(file.size / 1048576) + 'mb'
                                                        : Math.round(file.size / 1024) + 'kb'
                                                    : file.size + 'b'}
                                            </p>
                                            <button
                                                className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                                                onClick={() => handleDelete(objectURL)}
                                            >
                                                <svg
                                                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        className="pointer-events-none"
                                                        d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </section>
                                </article>

                            </li>


                    ))}
                    <li
                        className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 h-24"

                    >
                        <article className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer text-transparent hover:text-white shadow-sm">


                            <header
                                className="border-dashed border-2 border-gray-400 flex flex-col justify-center items-center">

                                <input
                                    id="hidden-input2"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <button
                                    id="button"
                                    className="mt-2 rounded-sm px-3 py-1  focus:shadow-outline focus:outline-none"
                                    onClick={handleClick}
                                >
                                    <div
                                        id="overlay"
                                        className="w-full h-full  top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
                                    >
                                        <i>
                                            <svg
                                                className="fill-current w-12 h-12 mb-3 text-blue-700"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                            </svg>
                                        </i>
                                        <p className="text-lg text-blue-700">
                                            <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                        </p>
                                    </div>
                                </button>
                            </header>
                        </article>
                    </li>
                </ul>
            </section>

            <footer className="flex justify-end px-8 pt-12">
                <button
                    id="submit"
                    className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                    onClick={handleSubmit}
                >
                    Upload now
                </button>
                <button
                    id="cancel"
                    className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </footer>
        </article>
    );
};

export default CustomerTicketsFrontOfTheUnitSection;
