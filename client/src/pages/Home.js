import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

function Home({ user, setUser }) {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch('/products')
        .then((r)=>r.json())
        .then(data=> setProducts(data))
    },[])

    const productList = products.map(product=>{
        return <ProductCard key={product.id} product={product}/>
    })

    return (
        <>
        <NavBar user={user} setUser={setUser} />
        <h1>Products</h1>
        {productList}
        </>
    )
}

export default Home;
