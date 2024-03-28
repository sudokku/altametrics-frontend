import React, { useState } from 'react';

interface PaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    pageSize,
    totalPages,
    onPageChange,
    onPageSizeChange,
}) => {
    const [currentPage, setCurrentPage] = useState(page);
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = parseInt(event.target.value);
        setCurrentPageSize(newPageSize);
        onPageSizeChange(newPageSize);
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <select
                className="px-2 py-1 border border-gray-300 rounded-md"
                value={currentPageSize}
                onChange={handlePageSizeChange}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            {Array(totalPages).fill(null).map((_, index) => (
                <button
                    key={index}
                    className={`px-2 py-1 border border-gray-300 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                        }`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;