import React from "react";
import { signOut, useSession } from 'next-auth/react';
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react'
import { Store } from "../utils/Store";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import DropdownLink from "./DropdownLink";

const Layout = (props) => {
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET'});
    signOut({
    
      callbackUrl: '/login'
    });
  };
 
  return (
    <>
      <Head>
        <title>{props.title ? props.title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1}/>
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
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">Profile</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/order-history">Order History</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                    <a className="dropdown-link" href="#" onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" legacyBehavior> 
                  <a className="p-2">Login</a>
                </Link>
              )}
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
