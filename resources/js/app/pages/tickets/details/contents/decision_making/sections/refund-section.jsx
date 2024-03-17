import { GlobeAmericasIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import React from 'react'

export default function RefundSection() {
    return (
        <>
            <section className="container border-2 border-slate-400">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center ">
                        <div className="flex items-center gap-x-3 mt-4 my-4">
                            <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REFUND
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="container px-4 mx-auto">
                    <div className="flex gap-x-3 mt-2">
                        <button type="button" class="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-green-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-500 hover:bg-green-500 hover:text-gray-500">
                            <GlobeAmericasIcon className='h-5' />
                            <span>CA</span>
                        </button>
                        <button type="button" class="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-yellow-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-500 hover:bg-yellow-300 hover:text-gray-500"><Squares2X2Icon className='h-5' /><span>VSE3B9</span></button>
                    </div>
                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        <div class="sm:col-span-2">
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Retailer's Price</label>
                            <div>
                                <input type="text" name="length" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Discount</label>
                            <div>
                                <input type="text" name="width" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Price After Discount</label>
                            <div>
                                <input id="" name="height" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Estimated Cost of Refund</label>
                            <div>
                                <input id="" name="height" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Cheque No.</label>
                            <div>
                                <input type="text" name="length" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Cheque Amount</label>
                            <div>
                                <input type="text" name="width" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Mail Date</label>
                            <div>
                                <input id="" name="height" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div>
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Cost of Unit</label>
                            <div class="col-span-full">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                                    <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <label for="username" class="block text-sm mt-4 font-medium leading-6 text-gray-900">Cube Weight</label>
                            <div class="col-span-full">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                                    <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pb-7 mt-6">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Dimension</h2>
                        <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-2">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Length</label>
                                <div>
                                    <input type="text" name="length" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Width</label>
                                <div>
                                    <input type="text" name="width" id="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Height</label>
                                <div>
                                    <input id="" name="height" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Canada to Canada</label>
                                <div>
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-lg h-9 shadow-sm shadow-black">
                                        GET FEDEX RATES
                                    </button>
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Shipping Cost</label>
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                                    <input type="text" name="" id="" class="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Total Estimated Cost</label>
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                                    <input type="text" name="" id="" class="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-2 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
