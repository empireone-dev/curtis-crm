import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";

export default function Pagination({ data }) {
    const currentPage = data?.current_page;
    const lastPage = data?.last_page;
    const maxVisiblePages = 5; // Maximum number of pages to show

    const getPageNumbers = () => {
        const pages = [];

        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', lastPage);
            } else if (currentPage > lastPage - 3) {
                pages.push(1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage);
            }
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full">
            <div className="-mt-px flex w-0 flex-1">
                {currentPage > 1 && (
                    <Link
                        href={`?page=${currentPage - 1}`}
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        <ArrowLongLeftIcon
                            aria-hidden="true"
                            className="mr-3 h-5 w-5 text-gray-400"
                        />
                        Previous
                    </Link>
                )}
            </div>
            <div className="hidden md:-mt-px md:flex">
                {getPageNumbers().map((page, index) => (
                    <Link
                        key={index}
                        href={typeof page === 'number' ? `?page=${page}` : "#"}
                        className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${
                            currentPage === page
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                    >
                        {page}
                    </Link>
                ))}
            </div>
            <div className="-mt-px flex  flex-1 justify-end w-full">
                {currentPage < lastPage && (
                    <Link
                        href={`?page=${currentPage + 1}`}
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        Next
                        <ArrowLongRightIcon
                            aria-hidden="true"
                            className="ml-3 h-5 w-5 text-gray-400"
                        />
                    </Link>
                )}
            </div>
        </nav>
    );
}
