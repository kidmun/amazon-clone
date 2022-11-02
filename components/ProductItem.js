/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ProductItem = (props) => {
    return <div className="card">
        <Link href={`/product/${props.product.slug}`} legacyBehavior>
            <a>
                <img
                src={props.product.image}
                alt={props.product.name}
                className="rounded shadow"
                />
            </a>
        </Link>
        <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${props.product.slug}`} legacyBehavior>
            <a>
            <h2 className="text-lg">
                {props.product.name}
            </h2>
            </a>
        </Link>
        <p className="mb-2">{props.product.brand}</p>
        <p>${props.product.price}</p>
        <button className="primary-button" type="button">Add To Card</button>
        </div>
    </div>
};

export default ProductItem;