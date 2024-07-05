import { UserCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import ContentActivitiesWarrantyValidationComponents from "../components/content-activities-warranty-validation-components";
import ContentActivitiesDecisionMakingComponents from "../components/content-activities-decision-making-components";
import ContentActivitiesRepairComponents from "../components/content-activities-repair-components";
import ContentActivitiesRefundComponents from "../components/content-activities-refund-components";
import ContentActivitiesReplacementComponents from "../components/content-activities-replacement-components";
import ContentActivitiesPartsValidationComponents from "../components/content-activities-parts-validation-components";
import ContentActivitiesInternalsComponents from "../components/content-activities-internals-components";
import ContentActivitiesReplacementPartsComponents from "../components/content-activities-replacement-parts-components";
import ContentActivitiesAvailabilityComponents from "../components/content-activities-availability-components";
import ContentActivitiesClosedComponents from "../components/content-activities-closed-components";
import ContentActivitiesCreatedTicketComponents from "../components/content-activities-created-components";
import ContentActivitiesWarehouseReceivedComponents from "../components/content-activities-warehouse-received-components";
import ContentActivitiesAssignedToComponents from "../components/content-activities-assigned-to-components";
import ContentActivitiesChangeCallTypeComponents from "../components/content-activities-change-call-type-components";

export default function ContentActivitiesTimelineSection() {
    const { activities } = useSelector((state) => state.tickets);
    const { ticket } = useSelector((state) => state.tickets);

    return (
        <ol className="relative border-s border-gray-200 mx-3">
            {activities.map((res, i) => {
                const formattedTimestamp = moment(res.created_at).fromNow();
                switch (res.type) {
                    case "WARRANTY VALIDATION":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Validated on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                {/* <p className="mb-4 text-base font-normal text-gray-500">
                                    {res.message}
                                </p> */}
                                <ContentActivitiesWarrantyValidationComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "DECISION MAKING":
                        console.log("resresres", res);
                        return (
                            <>
                                <li
                                    key={i}
                                    className="mb-10 ms-6 bg-white p-3 rounded-md shadow-md"
                                >
                                    <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                        #{res?.user?.emp_id}
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                            {formattedTimestamp}
                                        </span>
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                        Resourced on{" "}
                                        {moment(res.created_at).format("LLL")}
                                    </time>
                                    {res?.ticket?.status ==
                                        "WAITING FOR PHOTOS" && (
                                        <div className="text-2xl">
                                            Waiting for Proof of destroy -
                                            PHOTOS
                                        </div>
                                    )}

                                    {res?.ticket?.status == "US WAREHOUSE" && (
                                        <div className="text-2xl">
                                            Ticket assigned to US Warehouse
                                        </div>
                                    )}

                                    {res?.ticket?.status == "CA WAREHOUSE" && (
                                        <div className="text-2xl">
                                            Ticket assigned to CA Warehouse
                                        </div>
                                    )}
                                    {res?.ticket?.status == "REPAIR" && (
                                        <div className="text-2xl">
                                            Ticket assigned to ASC
                                        </div>
                                    )}
                                </li>
                                <li key={i} className="mb-10 ms-6">
                                    <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                        #{res?.user?.emp_id}
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                            {formattedTimestamp}
                                        </span>
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                        Resourced on{" "}
                                        {moment(res.created_at).format("LLL")}
                                    </time>
                                    <ContentActivitiesDecisionMakingComponents
                                        data={res}
                                    />
                                </li>
                            </>
                        );
                        break;
                    case "REPAIR":
                    case "NOT REPAIR":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesRepairComponents data={res} />
                            </li>
                        );
                        break;
                    case "REFUND SHIPPED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesRefundComponents data={res} />
                            </li>
                        );
                        break;
                    case "REPLACEMENT NOT SHIPPED":
                    case "REPLACEMENT SHIPPED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesReplacementComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "PARTS VALIDATION":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesPartsValidationComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "INTERNALS":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesInternalsComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "PARTS REPLACEMENT NOT SHIPPED":
                    case "PARTS REPLACEMENT SHIPPED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesReplacementPartsComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "AVAILABILITY":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesAvailabilityComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;

                    case "TICKET WARRANTY CLOSED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesClosedComponents data={res} />
                            </li>
                        );
                        break;
                    case "TICKET CREATED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Ticket Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesCreatedTicketComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "WAREHOUSE RECEIVED":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    #{res?.user?.emp_id}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Ticket Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesWarehouseReceivedComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "ASSIGNED TO":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    {res.user.role_id == 1
                                        ? "Admin"
                                        : `#${res?.user?.emp_id}`}

                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Ticket Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesAssignedToComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    case "CHANGE CALL TYPE":
                        return (
                            <li key={i} className="mb-10 ms-6">
                                <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                    {res.user.role_id == 1
                                        ? "Admin"
                                        : `#${res?.user?.emp_id}`}

                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                        {formattedTimestamp}
                                    </span>
                                </h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    Ticket Created on{" "}
                                    {moment(res.created_at).format("LLL")}
                                </time>
                                <ContentActivitiesChangeCallTypeComponents
                                    data={res}
                                />
                            </li>
                        );
                        break;
                    default:
                        break;
                }
            })}
        </ol>
    );
}
