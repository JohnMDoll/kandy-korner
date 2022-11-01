import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Products.css"

export const ProductSearch = () => {
    const [products, setProducts] = useState([])
    const [filteredProd, setFilter] = useState([])
    const [highOnly, updateHighOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const localUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localUser)

    // useEffect(
    //     () => {
    //             setSearchTerm()
    //     },
    //     []
    // )
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(res => res.json())
                .then(prodArr => setProducts(prodArr))
        },
        []
    )

    useEffect(
        () => {
            const filtered = products.filter((prod) => prod.name.toLowerCase().includes(searchTerm))
            setFilter(filtered)
        },
        [searchTerm]
    )
    return <>
        <h2>What candy are you looking for?</h2>
        {/* {
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
        } */}
        <div>
            <input
                onChange={
                    (changeEvent) => {
                        if (changeEvent.target.value>""){
                        setSearchTerm(changeEvent.target.value)
                    } else {
                        setSearchTerm(undefined)
                    }
                    }
                }
                type="text" placeholder="Enter search terms" />
        </div>

        <article className="products">
            {
                filteredProd.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <div>(somebody should probably put a picture here or something)</div>
                            <footer>${product.pricePerUnit} each</footer>
                        </section>
                    }
                )
            }
        </article>
    </>

}
