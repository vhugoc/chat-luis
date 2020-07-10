import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function ProductList(props) {
  return(
    <>
      <div className="product-content">
        <ListGroup>
          {props.products.map((product) => (
            <ListGroupItem key={product._id}>{product.quantity} {product.name}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default ProductList;
