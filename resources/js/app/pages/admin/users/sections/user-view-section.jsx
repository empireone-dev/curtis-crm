import { EyeIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

export default function UserViewSection({data}) {
    const [open, setOpen] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const tooltipWidth = 85;
        const tooltipHeight = 35;
        const tooltipX =
            rect.left + window.pageXOffset + rect.width + tooltipWidth <
            window.innerWidth
                ? rect.right + window.pageXOffset
                : rect.left + window.pageXOffset - tooltipWidth;
        const tooltipY = rect.top + scrollTop - tooltipHeight;
        setTooltipPosition({ x: tooltipX, y: tooltipY });
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <div>
            <button
                onClick={() => router.visit(`/administrator/users/${data.id}`)}
                type="button"
                className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center"
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={() => handleMouseLeave()}
            >
                <EyeIcon className="h-6 text-white" />
                {tooltipVisible && (
                    <span
                        className="tooltip bg-black text-white text-md rounded-xl p-3 absolute z-50"
                        style={{
                            top: tooltipPosition.y + window.pageYOffset,
                            left: tooltipPosition.x,
                        }}
                    >
                        View Tickets
                    </span>
                )}
            </button>
        </div>
    );
}
