import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from 'react-toastify';
import Layout from "../../components/Layout";
import { useContext } from "react";
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from "../../utils/Store";
import axios from "axios";

const ProductDetailPage = ({product}) => {
 
  const {state, dispatch} = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }
  const addToCartHandler = async () =>{
   
    let quantity = 1;
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    if (existingItem){
      quantity = existingItem.quantity + 1;
    }
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity){
      return toast.error('Sorry. Product is out of stock');
    }
dispatch({ type: 'CART_ADD_ITEM', payload: {
  ...product, quantity: quantity
}});

router.push('/cart');
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
        <div className="grid md:grid-cols-4 md:gap3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </div>
          <div className="pl-2">
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock": "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCartHandler}>Add To Cart</button>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
