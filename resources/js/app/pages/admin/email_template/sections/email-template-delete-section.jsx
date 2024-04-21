import Modal from '@/app/layouts/components/modal'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { delete_email_templates_thunk } from '../redux/email-template-thunk';
import store from '@/app/store/store';

export default function EmailTemplateDeleteSection({data}) {
    const [open, setOpen] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const closeModal = () => {
        setOpen(false);
      };

      useEffect(() => {
        if (tooltipVisible) {
            const handleScroll = () => {
                setTooltipVisible(false);
            };
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [tooltipVisible]);

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const tooltipWidth = 85;
        const tooltipHeight = 35;
        const tooltipX = rect.left + window.pageXOffset + rect.width + tooltipWidth < window.innerWidth
            ? rect.right + window.pageXOffset
            : rect.left + window.pageXOffset - tooltipWidth;
        const tooltipY = rect.top + scrollTop - tooltipHeight;
        setTooltipPosition({ x: tooltipX, y: tooltipY });
        setTooltipVisible(true);
    };


    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

      function deleteEmailTemplate(id) {
        store.dispatch(delete_email_templates_thunk(id))
        closeModal();
    }
  return (
    <div>
         <button
                onClick={() => setOpen(true)}
                type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center"
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={() => handleMouseLeave()}>
                <TrashIcon className='h-6 text-white' />
                {tooltipVisible && (
                <span className="tooltip bg-black text-white text-md rounded-xl p-3 absolute z-50" style={{ top: tooltipPosition.y + window.pageYOffset, left: tooltipPosition.x }}>Delete Email Template</span>
            )}
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Delete Email Template"
            >
                Are you sure you want to delete Email Template?

                <div class="flex border-gray-200 rounded-b  mt-3.5">
                    <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  " onClick={() => deleteEmailTemplate(data.id)}>Yes, Proceed</button>
                    <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100     " onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
    </div>
  )
}
