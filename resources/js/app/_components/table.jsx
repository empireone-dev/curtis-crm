import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRowKeys } from "../pages/admin/tickets/_redux/tickets-slice";
import {
    change_check_all_service,
    change_isExport_service,
} from "../services/tickets-service";
import CheckBoxFunction from "./checkbox-function";
import store from "../store/store";
import { get_tickets_thunk } from "../pages/admin/tickets/_redux/tickets-thunk";
import { router } from "@inertiajs/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Table({
    data,
    columns,
    isCheckbox,
    dataChecked,
    setDataChecked,
    isStatus,
}) {
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((store) => store.app);


    async function toggleAll(e) {
        setIsLoading(true);
        const all = data.map((res) => res.id);
        await change_check_all_service({
            isCheck: e.target.checked,
            all: all,
        });
        if (window.location.hash == "") {
            await store.dispatch(get_tickets_thunk(window.location.search));
        } else {
            await store.dispatch(
                get_tickets_thunk("?search=" + window.location.hash.slice(1))
            );
        }

        setChecked(!checked);
        setIsLoading(false);
    }

    const checkedValue = data.filter((item) => item.isExported !== null);

    useEffect(() => {
        setChecked(checkedValue.length == 10);
    }, []);



    const queryParams = new URLSearchParams(window.location.search);
    const callType = queryParams.get("call_type");
    const model = queryParams.get("model");
    const start = queryParams.get("start");
    const end = queryParams.get("end");
    const status = queryParams.get("status");
    const fullname = queryParams.get("fullname");
    const checkeds = queryParams.get("checked");
    const ticket_id = queryParams.get("ticket_id");

    const search_data = {
        call_type: callType ?? null,
        start: start == "null" ? null : start ?? null,
        end: end == "null" ? null : start ?? null,
        model: model?.split(",") ?? null,
        status: status ?? null,
        fullname: fullname ?? null,
        checked: checkeds ?? null,
        ticket_id: ticket_id ?? null,
    };

    function sort_data1(value) {
        router.visit(
            window.location.pathname +
            "?page=1&" +
            "start=" +
            search_data.start +
            "&end=" +
            search_data.end +
            "&call_type=" +
            search_data.call_type +
            "&model=" +
            search_data.model +
            "&status=" +
            search_data.status +
            value
        );
    }
    function sort_data2(value) {
        router.visit(
            window.location.pathname +
            "?page=1&" +
            "start=" +
            search_data.start +
            "&end=" +
            search_data.end +
            "&call_type=" +
            search_data.call_type +
            "&model=" +
            search_data.model +
            "&status=" +
            search_data.status +
            value
        );
    }
    function sort_data3(value) {
        router.visit(
            window.location.pathname +
            "?page=1&" +
            "start=" +
            search_data.start +
            "&end=" +
            search_data.end +
            "&call_type=" +
            search_data.call_type +
            "&model=" +
            search_data.model +
            "&status=" +
            search_data.status +
            value
        );
    }
    function sort_data(value) {
        if (value == 'check') {
            sort_data1(`&checked=${search_data.checked == 'asc' ? 'desc' : 'asc'}`)
        } else if (value == 'ticket_id') {
            sort_data2(`&ticket_id=${search_data.ticket_id == 'asc' ? 'desc' : 'asc'}`)
        } else if (value == 'fullname') {
            sort_data3(`&fullname=${search_data.fullname == 'asc' ? 'desc' : 'asc'}`)

        }
    }
    return (
        <div className="flow-root w-full shadow-2xl">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle ">
                    <div className="relative">
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    {isCheckbox && (
                                        <th
                                            scope="col"
                                            className="relative sm:w-12 sm:pl-6 sm:pr-2"
                                        >
                                            {isStatus && (
                                                <div className="flex gap-4">
                                                    {isLoading ? (
                                                        <div>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                                viewBox="0 0 100 101"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="currentFill"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            onClick={toggleAll}
                                                            type="checkbox"
                                                            checked={checked}
                                                            disabled={
                                                                user?.role_id !=
                                                                6
                                                            }
                                                            className="absolute  left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            ref={checkbox}
                                                        />
                                                    )}
                                                    <div className="pl-3">
                                                        All
                                                    </div>
                                                    <button
                                                        onClick={() => sort_data('check')}
                                                    >
                                                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </th>
                                    )}

                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="min-w-[8rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            <span class="flex items-center">

                                                {column.title}
                                                {
                                                    column.isSort && <button
                                                        onClick={() => sort_data(column.key)}
                                                    >
                                                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                                        </svg>
                                                    </button>
                                                }
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((row, rowIndex) => {
                                    console.log("rowrow", row);
                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={
                                                dataChecked.includes(row.id)
                                                    ? "bg-gray-50"
                                                    : undefined
                                            }
                                        >
                                            {isCheckbox && (
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    {/* {dataChecked.includes(
                                                        row.id
                                                    ) && (
                                                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                                    )} */}

                                                    {isStatus && (
                                                        <CheckBoxFunction
                                                            row={row}
                                                        />
                                                    )}
                                                </td>
                                            )}

                                            {columns.map((column) => {
                                                return (
                                                    <td
                                                        key={column.key}
                                                        className={classNames(
                                                            "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                                                            dataChecked.includes(
                                                                row
                                                            )
                                                                ? "text-indigo-600"
                                                                : "text-gray-900"
                                                        )}
                                                    >
                                                        {row[column.key]}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
