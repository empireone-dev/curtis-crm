import { get_ticket_by_id_service } from "@/app/services/tickets-service";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function TicketDetails() {
    const id = window.location.pathname.split("/")[3];
    const [data, setData] = useState({});
    useEffect(() => {
        async function get_data(params) {
            const data = await get_ticket_by_id_service(id);
              await setData(data.result);
            if (data.result) {
                setTimeout(()=>{
                    window.print();
                },[1000])
            }
        }

        get_data();
    }, []);
console.log('data',data)
    return (
        <div className="p-5">
            <div className="flex flex-col">
                <div>
                    <div className="flex flex-row">
                        <div className="w-2/5"></div>
                        <div className="w-full"></div>
                        <div className="w-2/5 flex items-end justify-end  font-black">
                            CASE FILE NUMBER
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row">
                        <div className="w-1/3"></div>
                        <div className="w-full flex items-center justify-center text-3xl font-black">
                            Curtis International Ltd
                        </div>
                        <div className="w-1/3 flex items-center justify-center text-xl font-black border-x-2 border-t-2 border-black ">
                            <div className="mx-3">{data.ticket_id ?? ""}</div>
                        </div>
                    </div>
                </div>
                <div className="border-x-2 border-t-2 border-black">
                    <div className="flex flex-row">
                        <div className="w-1/5"></div>
                        <div className=" w-full flex flex-col items-center justify-center">
                            <div className="font-bold text-lg">
                                Shipping Request Form
                            </div>
                            <div className="font-bold text-2xl">
                                {data.call_type ?? ""} (Replacement)
                            </div>
                        </div>
                        <div className="w-1/5"></div>
                    </div>
                </div>
                <div className="border-black border-x-2">
                    <div className="flex flex-row">
                        <div className="border-y-2 border-black w-full">
                            <div className="font-bold text-lg">
                                <div className="px-3">
                                    REQUEST RECEIVED DATE
                                </div>
                            </div>
                        </div>
                        <div className="border-y-2 items-center justify-center flex border-black w-full">
                            <div className="font-bold text-lg">
                                {data?.internal?<>{moment(data?.internal[0]?.created_at).format('LL') ?? ""}</>:data?.refund?.ship_date?? ""}
                            </div>
                        </div>
                        <div className="border-y-2 border-black w-full"></div>
                    </div>
                </div>
                <div className="border-x-2  border-b-2 border-black">
                    <div className="flex flex-row">
                        <div className="w-full font-bold text-lg">
                            <div className="px-3">SHIPPING DETAILS:</div>
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                    </div>
                </div>
                <div className="border-x-2  border-black">
                    <div className="flex flex-row ">
                        <div className="w-1/5 "></div>
                        <div className=" w-full ">
                            <div className=" flex">
                                <div className="border-2 border-black w-full mt-3 flex">
                                    <div className="w-full px-3 font-bold">
                                        Name
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.fname ?? ""} {data.lname ?? ""}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Address 1
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.address ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        City
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.city ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        State/Prov
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.state ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Zip/Postal Code
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.zip_code ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full mb-3 flex">
                                    <div className="w-full px-3 font-bold">
                                        Phone Number
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.phone ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/5 "></div>
                    </div>
                </div>
                <div className="border-x-2 border-t-2 border-b-2 border-black">
                    <div className="flex flex-row">
                        <div className="w-full">
                            <div className="font-bold text-lg">
                                <div className="px-3">PRODUCT DETAILS:</div>
                            </div>
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                    </div>
                </div>
                <div className="border-x-2  border-black">
                    <div className="flex flex-row  mb-2">
                        <div className="w-1/5 "></div>
                        <div className=" w-full ">
                            <div className=" flex">
                                <div className="border-2 border-black w-full mt-3 flex">
                                    <div className="w-full px-3 font-bold">
                                        Model Number
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.item_number ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Description
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data?.unit ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Serial Number
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data.serial_number ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                            {/* <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Weight
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data?.decision_making?.cube_weight ?? 'N/A'}
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className="border-2 border-black w-full my-1 flex">
                                    <div className="w-full px-3 font-bold">
                                        Dimensions (LxWxH)
                                    </div>
                                    <div className="w-full px-3 font-bold">
                                        {data?.decision_making?.length ?? 'N/A'}x{data?.decision_making?.width ?? 'N/A'}x{data?.decision_making?.height ?? 'N/A'}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="w-1/5 "></div>
                    </div>
                </div>
                {data?.internal?.length !== 0 && (
                    <>
                        <div className="border-x-2 border-t-2 border-b-2 border-black">
                            <div className="flex flex-row">
                                <div className="w-full">
                                    <div className="font-bold text-lg">
                                        <div className="px-3">
                                            REQUESTED PART/S:
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full"></div>
                            </div>
                        </div>
                        <div className="border-x-2  border-black">
                            <div className="flex flex-row  mb-2">
                                <div className="w-1/5 "></div>
                                <div className=" w-full ">
                                    <div className=" flex">
                                        <div className="border-2 border-black w-full mt-3 flex">
                                            <div className="w-full px-3 font-bold">
                                                <ul class="max-w-md space-y-1 text-black list-disc list-inside ">
                                                    {data?.internal &&
                                                        data?.internal?.map(
                                                            (res, i) => {
                                                                return (
                                                                    <li key={i}>
                                                                        {
                                                                            res.name
                                                                        }{" "}
                                                                        (Cost:{" "}
                                                                        {
                                                                            res.cost
                                                                        }
                                                                        )
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/5 "></div>
                            </div>
                        </div>
                    </>
                )}

                {data?.replacement && (
                    <>
                        <div className="border-x-2 border-t-2 border-b-2 border-black">
                            <div className="flex flex-row">
                                <div className="w-full">
                                    <div className="font-bold text-lg">
                                        <div className="px-3">
                                            REPLACEMENT ITEM:
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full"></div>
                            </div>
                        </div>
                        <div className="border-x-2  border-black">
                            <div className="flex flex-row  mb-2">
                                <div className="w-1/5 "></div>
                                <div className=" w-full ">
                                    <div className=" flex">
                                        <div className="border-2 border-black w-full mt-3 flex">
                                            <div className="w-full px-3 font-bold">
                                                Model Number
                                            </div>
                                            <div className="w-full px-3 font-bold">
                                                {data.model ?? "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex">
                                        <div className="border-2 border-black w-full my-1 flex">
                                            <div className="w-full px-3 font-bold">
                                                Description
                                            </div>
                                            <div className="w-full px-3 font-bold">
                                                {data?.replacement?.unit ??
                                                    "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex">
                                        <div className="border-2 border-black w-full my-1 flex">
                                            <div className="w-full px-3 font-bold">
                                                Serial Number
                                            </div>
                                            <div className="w-full px-3 font-bold">
                                                {data.serial_number ?? "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/5 "></div>
                            </div>
                        </div>
                    </>
                )}

                <div className="border-x-2 border-t-2 border-b-2 border-black">
                    <div className="flex flex-row">
                        <div className="w-full">
                            <div className="font-bold text-lg">
                                <div className="px-3">
                                    REPLACEMENT COMMENTS:
                                </div>
                            </div>
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                    </div>
                </div>
                <div className="flex flex-row border-x-2 border-b-2 border-black">
                    <div className="w-1/5 "></div>
                    <div className=" w-full ">
                        <div className=" flex mb-2">
                            <div className="border-2 border-black w-full mt-3 flex items-center justify-center">
                                <div className="w-full px-3 font-bold flex items-center justify-center">
                                    {data?.replacement?.notes ?? "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5 "></div>
                </div>
            </div>
        </div>
    );
}
