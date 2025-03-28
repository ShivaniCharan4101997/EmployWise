import React, { useCallback, useState, useEffect } from "react";
import { useUsers } from "../contexts/fetchUsersContext.tsx";

function Pagination() {
    const { isLoading, setPage, page, totalPages } = useUsers();
    const [debouncedPage, setDebouncedPage] = useState(page);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPage(debouncedPage);
        }, 300);
        return () => clearTimeout(timeout);
    }, [debouncedPage, setPage]);

    const isPrevDisabled = page === 1 || isLoading || totalPages === 1;
    const isNextDisabled = page === totalPages || isLoading || totalPages === 1;

    const handlePrev = useCallback(() => {
        setDebouncedPage((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleNext = useCallback(() => {
        setDebouncedPage((prev) => Math.min(prev + 1, totalPages));
    }, [totalPages]);

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                aria-label="Go to previous page"
                className="px-4 py-2 mx-2 bg-pink-400 text-white rounded-lg disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2 text-pink-700">
                Page {page} of {totalPages}
            </span>
            <select
                value={page}
                onChange={(e) => setDebouncedPage(Number(e.target.value))}
                className="ml-2 px-2 py-1 border border-pink-400 rounded"
            >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <button
                onClick={handleNext}
                disabled={isNextDisabled}
                aria-label="Go to next page"
                className="px-4 py-2 mx-2 bg-pink-400 text-white rounded-lg disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

export default React.memo(Pagination);
