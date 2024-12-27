import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import { setForm } from "@/app/pages/admin/tickets/create/redux/tickets-create-slice";
import { address_lookup_service } from "@/app/services/address-lookup";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchAddressSection({ data }) {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    console.log('datadata',data)
    useEffect(() => {
        if (open) {
            async function search_address(params) {
                setLoading(true);
                try {
                    const resp = await address_lookup_service({
                        q: `${data?.address}` + ` ${data?.zip_code}`
                    });
                    setAddress(resp?.items?.map(res=>({
                        zip_code:res.address.postalCode,
                        country:res.address.countryName == 'United States'?'US':'CA',
                        state:res.address.stateCode,
                        city:res.address.city,
                        address:res.address.label,
                     })));
                    setLoading(false);
                } catch (error) {
                    setOpen(false);
                    message.error("Location not found!");
                }
            }
            search_address();
        }
    }, [open]);

    function change_address(value) {
      
        dispatch(
            setForm({
                ...data,
                country: value.country,
                state: value.state,
                address: value.address,
                zip_code: value.zip_code,
                city: value.city,
            })
        );
        setOpen(false);
    }

    function open_modal(params) {
        if (!data.address) {
            message.error("Address is required");
        } else if (!data.zip_code) {
            message.error("Zipcode is required");
        } else {
            setOpen(true);
        }
    }
    return (
        <div>
            <Button type="button" onClick={() => open_modal()} className="my-3">
                Lookup Address
            </Button>
            <Modal width="max-w-6xl" open={open} setOpen={setOpen}>
                {loading ? (
                    "Loading..."
                ) : (
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Zipcode
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Country
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    State
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    City
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                >
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {address?.length == 0 && (
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        Address Not found!
                                    </td>
                                </tr>
                            )}
                            {address?.map((res, i) => (
                                <tr key={i}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {res.zip_code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {res.country}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {res.state}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {res.city}
                                    </td>
                                   
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {res.address}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a
                                            onClick={() => change_address(res)}
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            SELECT ADDRESS
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Modal>
        </div>
    );
}
