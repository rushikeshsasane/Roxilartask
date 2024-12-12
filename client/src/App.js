import React, { useEffect, useState } from 'react';
import ProductTable from './ProductTable';
import Pagination from './Pagination';
import './App.css';
import App2 from './App2';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (page) => {
      const response = await fetch(`http://localhost:3005/products?page=${page}`);
      const data = await response.json();
      setProducts(data.data);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="App">
      <h1 className='text-center fw-bold bg-dark text-warning p-3'>Product List</h1>
      <ProductTable products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

<div style={{marginTop:-100}}>
      <App2/>
      </div>
    </div>
  );
};

export default App;
