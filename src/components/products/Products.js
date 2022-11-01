import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Products.css"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProd, setFilter] = useState([])
    const [highOnly, updateHighOnly] = useState(false)
    const navigate = useNavigate()
    const localUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localUser)

    // useEffect(
    //     () => {
    //             updateHighOnly()
    //     },
    //     []
    // )
    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(res => res.json())
                .then((prodArr) => {
                    setProducts(prodArr.sort((a, b) => {
                        //used to sort prods by price-> setProducts(prodArr.sort((a, b) => a.pricePerUnit - b.pricePerUnit))
                        if ((a.name.toLowerCase()) > (b.name.toLowerCase())) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                    ))
                })
        },
        []
    )

    useEffect(
        () => {
            if (highOnly) {
                const filtered = products.filter((prod) => prod.pricePerUnit > 1.99)
                setFilter(filtered)
            }
            else {
                setFilter(products)
            }
        },
        [products, highOnly]
    )
    return <>
        <h2>List of products</h2>
        {
            kandyUserObject.staff
                ?
                <>
                    <button onClick={() => { updateHighOnly(true) }}>Top Priced</button>
                    <button onClick={() => { updateHighOnly(false) }}>Show All</button>
                    <button className="productForm__link" to="createProduct" onClick={() => {
                    navigate("createProduct", {replace: true})
                }}>Create Product</button>
                </>
                :
                <></>
        }
        <article className="products">
            {
                filteredProd.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <div>(somebody should probably put a picture here or something)</div>
                            <div> • {product.productType.typeName}</div>
                            <footer>${product.pricePerUnit}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>

}
