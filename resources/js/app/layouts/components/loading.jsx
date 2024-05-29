import React from 'react'

export default function Loading() {
    return (
        <div className='flex gap-2'>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute delay-1000 inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute delay-[2000ms] inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute delay-[3000ms] inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute delay-[3000ms] inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
        </div>
    )
}
