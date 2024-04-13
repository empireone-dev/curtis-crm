import React from 'react'

export default function RepairSection() {
    return (
        <>
            <section className="container border-2 border-slate-400">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4 my-4 ">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REPAIR
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="container px-4 mx-auto">
                    <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 flex-1">
                        <div className="w-full">
                        <div class="relative w-full min-w-[200px] h-10 mb-8">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    ASC's
                                </label>
                            </div>
                            <div class="relative w-full min-w-[200px] h-10 mb-8">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Repair Cost
                                </label>
                            </div>
                            <div class="relative w-full min-w-[200px] h-10 mb-8">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Warranty Instruction
                                </label>
                            </div>
                            <div class="relative w-full min-w-[200px] h-10 mb-8">
                                <textarea
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Notes
                                </label>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="mb-2 mt-4 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
