import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="text-center col-md-12">
      <div className="pagination">
      <button className='btn btn-outline-info' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button className='btn btn-outline-info' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
    </div>
  );
};

export default Pagination;
