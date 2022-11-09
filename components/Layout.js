import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useState } from "react";
import { useEffect } from "react";

const Layout = (props) => {
  const [cartItemsCount, setCartItemsCount] = useState();

  const { state } = useContext(Store);
  const { cart } = state;
  
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
 
  return (
    <>
      <Head>
        <title>{props.title ? props.title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" legacyBehavior>
              <a className="text-lg font-bold">Amazona</a>
            </Link>
            <div>
              <Link href="/cart" legacyBehavior>
                <a className="p-2">
                  Cart{" "}
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{props.children}</main>
        <footer className="flex h-10 justify-center items-senter shadow-inner">
          <p>Copyright @2015 Ethiopia</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
