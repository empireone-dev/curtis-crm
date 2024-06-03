import moment from "moment";
import React, { useState } from "react";

export default function OpenCasesListSection({ data }) {
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
    function isEven(data) {
        return data === "support2@curtiscs.com";
    }

    const emailString = data.from;

    // Regular expression to extract name and email
    const emailRegex = /^([^<]+)<([^>]+)>$/;

    // Match the name and email using regex
    const match = emailString.match(emailRegex);

    // Extract the name and email from the matched string
    const name = match ? match[1].trim() : null;
    const email = match ? match[2].trim() : null;
    return (
        <ol className="mx-10 ">
            <li
                class={
                    isEven(email)
                        ? "border-l-2 border-purple-600"
                        : "border-l-2 border-green-600"
                }
            >
                <div class="md:flex flex-start">
                    <div
                        class={
                            isEven(email)
                                ? "bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5"
                                : "bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5"
                        }
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            class="text-white w-3 h-3"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                            ></path>
                        </svg>
                    </div>
                    <div class="block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10 w-full">
                        <div class="flex justify-between mb-4">
                            <a
                                href="#!"
                                class="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                            >
                                {name}
                                <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {email}
                                </p>
                            </a>

                            <a
                                href="#!"
                                class="font-medium flex flex-col items-end justify-end text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                            >
                                <div>{moment(data.date).fromNow()}</div>
                                <div>{moment(data.date).format("LLL")}</div>
                            </a>
                        </div>
                        <p class="text-gray-700 mb-6">
                            <HtmlParser
                                html={convertToParagraph(
                                    data?.body?.split("wrote:")[0]
                                )}
                            />
                        </p>
                        {/* <div className="flex gap-3">
                                <button
                                    type="button"
                                    class="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-mdb-ripple="true"
                                >
                                    Preview
                                </button>
                                <button
                                    type="button"
                                    class="inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    data-mdb-ripple="true"
                                >
                                    See demo
                                </button>
                            </div> */}
                    </div>
                </div>
            </li>
        </ol>
    );
}
