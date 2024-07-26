import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Autocomplete({ value, onChange, defaultValue }) {
    const [selectedValue, setSelectedValue] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (selectedValue !== null) {
            onChange(JSON.stringify(selectedValue), 'issue');
        }
    }, [selectedValue]);

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(JSON.parse(defaultValue));
        }
    }, [defaultValue]);

    const filteredValue =
        query === ''
            ? value
            : value.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );
    return (
        <Combobox value={selectedValue} onChange={setSelectedValue}>
            <div className="relative mt-1">
                <div className='peer text-black placeholder-transparent w-full py-1 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500'>
                    <div className="grid grid-flow-row-dense grid-cols-4 ">
                        {/* {selectedValue && (
                            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-100 bg-blue-700 border border-blue-700">
                                <div slot="avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart w-3 mr-1">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </div>
                                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                    {selectedValue.name}
                                </div>
                                <div className="flex flex-auto flex-row-reverse">
                                    <button
                                        type='button'
                                        onClick={() => setSelectedValue(null)}
                                    >
                                        <XMarkIcon className='h-6' />
                                    </button>
                                </div>
                            </div>
                        )} */}
                    </div>
                    <Combobox.Input
                        className="w-[75vw] border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person) => person?.name || ''}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredValue.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredValue.map((person, i) => (
                                <Combobox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                                        }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
