import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React from "react";

export default function RefundSection() {
    return (
        <>
            <section className="container border-2 border-slate-400">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center ">
                        <div className="flex items-center gap-x-3 mt-4 my-4">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REFUND
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="container px-4 mx-auto">
                    <div className="flex gap-x-3 mt-2">
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-green-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-500 hover:bg-green-500 hover:text-gray-500"
                        >
                            <GlobeAmericasIcon className="h-5" />
                            <span>CA</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-yellow-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-500 hover:bg-yellow-300 hover:text-gray-500"
                        >
                            <Squares2X2Icon className="h-5" />
                            <span>VSE3B9</span>
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Retailer's Price
                            </label>
                        </div>

                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Discount
                            </label>
                        </div>

                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Price After Discount
                            </label>
                        </div>

                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Estimated Cost of Refund
                            </label>
                        </div>
                    </div>
                    <div className="mt-3.5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Cheque No.
                            </label>
                        </div>

                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Cheque Amount
                            </label>
                        </div>

                        <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                            <input
                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                placeholder=""
                            />
                            <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                Mail Date
                            </label>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 flex-1">
                        <div className="w-full">
                            <div class="relative w-full min-w-[200px] h-10 md:flex mb-6">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 sm:text-lg">
                                    $
                                </span>
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Cost of Unit
                                </label>
                            </div>

                            <div class="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Cube Weight
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pb-7 mt-7">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Dimension
                        </h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Length
                                </label>
                            </div>

                            <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Width
                                </label>
                            </div>

                            <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mt-2">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Height
                                </label>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Canada to Canada
                                </label>
                                <div>
                                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-lg h-9 shadow-sm shadow-black">
                                        GET FEDEX RATES
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mb-3">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 sm:text-lg">
                                    $
                                </span>
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Shipping Cost
                                </label>
                            </div>

                            <div className="sm:col-span-2 relative w-full min-w-[200px] h-10 md:flex mb-3">
                                <input
                                    className="peer text-black placeholder-transparent w-full py-2.5 px-5 pl-8 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                    placeholder=""
                                />
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 sm:text-lg">
                                    $
                                </span>
                                <label className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white">
                                    Total Estimated Cost
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}
