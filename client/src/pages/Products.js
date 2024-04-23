import React,{ useContext } from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { UserContext } from "../contexts/UserContext";
import { ProductContext } from "../contexts/ProductContext";
import { Divider } from "../styles";

function Products() {
    const { user } = useContext(UserContext)
    const { products } = useContext(ProductContext)

    const productList = products.map(product=>{
        return <ProductCard key={product.id} product={product} user={user}/>
    })

    return (
        <>
        <NavBar />
        <h1>Products</h1>
        <Divider></Divider>
        {user ? productList : <h3>Must be logged in to access</h3>}
        </>
    )
}

export default Products;