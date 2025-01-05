'use client';
import { ITEMS_PER_PAGE } from '@/lib/data';
import { useRouter } from 'next/navigation';
import React from 'react';

const Pagination = ({ page, totalCount }: { page: number; totalCount: number }) => {
    const router = useRouter();
    const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < totalCount;
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        router.push(`${window.location.pathname}?${params}`);
    };
    return (
        <div className="p-4 flex items-center justify-between text-gray-500">
            <button
                disabled={!hasPrev}
                className="py-2 px-4 rounded-md bg-lightSky text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-black"
                onClick={() => handlePageChange(page - 1)}
            >
                Prev
            </button>
            <div className="flex items-center gap-2 text-sm">
                {Array.from({ length: Math.ceil(totalCount / ITEMS_PER_PAGE) }, (_, index) => {
                    const pageIndex = index + 1;
                    return (
                        <button
                            key={pageIndex}
                            className={`px-2 rounded-md py-1 ${page === pageIndex ? 'bg-lightSky text-white' : ''}`}
                            onClick={() => {
                                handlePageChange(pageIndex);
                            }}
                        >
                            {pageIndex}
                        </button>
                    );
                })}
            </div>
            <button
                disabled={!hasNext}
                className="py-2 px-4 rounded-md bg-lightSky text-xs font-semibold text-white  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-black"
                onClick={() => handlePageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;
