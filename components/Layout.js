import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = (props) => {
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
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{props.children}</main>
        <footer className="flex h-10 justify-center items-senter shadow-inner"><p>Copyright @2022 America</p></footer>
      </div>
    </>
  );
};

export default Layout;
