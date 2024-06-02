import moment from "moment";
import React, { useState } from "react";

export default function DirectEmailsListSection({ data }) {
    const [open, setOpen] = useState();
    var inputString = data.emails[0].emails[0].from;
    // Regular expression to extract email address
    var emailRegex = /<([^>]+)>/;

    // Match the email address using regex
    var match = inputString.match(emailRegex);

    // Extract the email address from the matched string
    var emailAddress = match ? match[1] : null;

    function convertToParagraph(text) {
        var text = text;

        // Split the text into paragraphs
        var paragraphs = text.split("\r\n\r\n");

        // Generate HTML markup for each paragraph
        var html = "";
        paragraphs.forEach(function (paragraph) {
            html += "<p>" + paragraph.replace(/\r\n/g, "<br>") + "</p>";
        });
        return html;
    }

    function HtmlParser({ html }) {
        const createMarkup = () => {
            return { __html: html };
        };

        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }

    return (
        <>
            <li
                onClick={() => setOpen(!open)}
                class="flex items-center border-y hover:bg-gray-200 px-2"
            >
                <input
                    type="checkbox"
                    class="focus:ring-0 border-2 border-gray-400"
                />
                <div class="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
                    <div class="flex items-center">
                        <span class="w-56 ml-5 truncate">{emailAddress}</span>
                        <span class="mx-1">-</span>
                        <span class="w-[700px] text-gray-600 text-sm truncate">
                            {data.emails[0].emails[0].body}
                        </span>
                    </div>
                    <div class="w-32 flex items-center justify-end">
                        <div
                            x-show="messageHover"
                            class="flex items-center space-x-2"
                            style={{ display: "none" }}
                        >
                            <button title="Archive">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="text-gray-500 hover:text-gray-900 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                                    ></path>
                                </svg>
                            </button>
                            <button title="Delete">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="text-gray-500 hover:text-gray-900 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                </svg>
                            </button>
                            <button title="Mark As Unread">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="text-gray-500 hover:text-gray-900 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </button>
                            <button title="Snooze">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="text-gray-500 hover:text-gray-900 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <span
                            x-show="!messageHover"
                            class="text-sm text-gray-500"
                        >
                            {moment(data.emails[0].emails[0].date).format("LL")}
                        </span>
                    </div>
                </div>
            </li>
            {open &&
                data.emails[0].emails.map((res, i) => {
                    console.log("resres", res.from);
                    const emailString = res.from;

                    // Regular expression to extract name and email
                    const emailRegex = /^([^<]+)<([^>]+)>$/;

                    // Match the name and email using regex
                    const match = emailString.match(emailRegex);

                    // Extract the name and email from the matched string
                    const name = match ? match[1].trim() : null;
                    const email = match ? match[2].trim() : null;
                    return (
                        <div className="bg-gray-200 shadow-xl px-3 divide-gray-100 m-5 py-4">
                            <ul role="list" class="divide-y ">
                                <li class="flex justify-between gap-x-6 py-5">
                                    <div class="flex min-w-0 gap-x-4">
                                        <img
                                            class="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <div class="min-w-0 flex-auto">
                                            <p class="text-sm font-semibold leading-6 text-gray-900">
                                                {name}
                                            </p>
                                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p class="text-sm leading-6 text-gray-900">
                                            {moment(res.date).format("LLL")}
                                        </p>
                                        <p class="mt-1 text-xs leading-5 text-gray-500">
                                            Last seen{" "}
                                            <time datetime="2023-01-23T13:23Z">
                                                {moment(res.date).fromNow()}
                                            </time>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <HtmlParser html={convertToParagraph(res.body)} />
                        </div>
                    );
                })}
        </>
    );
}
