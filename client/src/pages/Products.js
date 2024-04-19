import React,{ useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { UserContext } from "../contents/UserContext";
import { ProductContext } from "../contents/ProductContext";

function Products() {

    const { user } = useContext(UserContext)
    const { products, setProducts } = useContext(ProductContext)

    const productList = products.map(product=>{
        return <ProductCard key={product.id} product={product} user={user}/>
    })

    return (
        <>
        <NavBar />
        <h1>Products</h1>
        {user ? productList : <h3>Must be logged in to access</h3>}
        </>
    )
}

export default Products;