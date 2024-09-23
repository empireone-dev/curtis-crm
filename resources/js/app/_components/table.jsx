import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedRowKeys } from "../pages/admin/tickets/_redux/tickets-slice";

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
    const [indeterminate, setIndeterminate] = useState(false);
    const dispatch = useDispatch();
    // PROPERTIES
    // setDataChecked = useState
    // dataChecked = useState
    // columns=[]
    // data=[]
    // isCheckbox=boolean

    useLayoutEffect(() => {
        const isIndeterminate =
            dataChecked.length > 0 && dataChecked.length < data.length;
        setChecked(dataChecked.length === data.length);
        setIndeterminate(isIndeterminate);
        checkbox.current.indeterminate = isIndeterminate;
    }, [dataChecked]);

    function toggleAll() {
        dispatch(
            setSelectedRowKeys(
                checked || indeterminate ? [] : data.map((res) => res.id)
            )
        );

        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
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
                                            className="relative px-7 sm:w-12 sm:px-6"
                                        >
                                            <input
                                                type="checkbox"
                                                disabled
                                                checked={false}
                                                className="absolute hidden left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                ref={checkbox}
                                            />
                                        </th>
                                    )}

                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="min-w-[8rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((row, rowIndex) => (
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
                                                {dataChecked.includes(
                                                    row.id
                                                ) && (
                                                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                                )}

                                                {isStatus && (
                                                    <input
                                                        type="checkbox"
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        value={row.id}
                                                        checked={dataChecked.includes(
                                                            row.id
                                                        )}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                setSelectedRowKeys(
                                                                    e.target
                                                                        .checked
                                                                        ? [
                                                                              ...dataChecked,
                                                                              row.id,
                                                                          ]
                                                                        : dataChecked.filter(
                                                                              (
                                                                                  p
                                                                              ) =>
                                                                                  p !==
                                                                                  row.id
                                                                          )
                                                                )
                                                            )
                                                        }
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
