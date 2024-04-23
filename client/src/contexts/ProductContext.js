import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";


const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const  { user } = useContext(UserContext)

    useEffect(()=>{
        if (!user) {
            return;
        }

        fetch('/products')
        .then((r)=> r.json())
        .then(products=>{
            if (user) {
                setProducts(products)
            }
        })
    },[user])
    
    return <ProductContext.Provider value={{ products, setProducts }}>{ children }</ProductContext.Provider>
}

export { ProductContext, ProductProvider }