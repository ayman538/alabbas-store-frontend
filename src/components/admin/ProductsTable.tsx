import type { Product } from "../../types/product";
import { FaEdit, FaTrash } from "react-icons/fa";
type Props = {
  products: Product[];
};

function ProductsTable({ products }: Props) {
  return (

    <table className="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
           <th>store Price</th>
           <th>stock Quantity</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.nameEn}</td>
            <td>{product.price}</td>
            <td>{product.storePrice}</td>
            <td>{product.stockQuantity}</td>
            <td>{product.description}</td>

           <td>
             <button className="icon-button">
               <FaEdit />
             </button>

             <button className="icon-button">
               <FaTrash />
             </button>
           </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;