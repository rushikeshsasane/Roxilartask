import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <table className='table table-bordered table-hover table-striped table-responsive-sm text-center'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.dateOfSale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
