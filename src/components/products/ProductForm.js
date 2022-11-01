import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

export const ProductForm = () => {
    const [productTypes, setProductTypes] = useState([])
    const [newProduct, update] = useState({
        name: "",
        productTypeId: "",
        pricePerUnit: ""
    })
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        // {
        //     "userId": 3,
        //     "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
        //     "emergency": true,
        //     "dateCompleted": ""
        //   }
        const productToSendToAPI = {
            name: newProduct.name,
            productTypeId: newProduct.productTypeId,
            pricePerUnit: newProduct.pricePerUnit,
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })

    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(res => res.json())
                .then((typeArr) => setProductTypes(typeArr))
        },
        []
    )

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product Entry</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Input new product name"
                        value={newProduct.name}
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <ol>
                        {productTypes.map(type => <li key={type.id}>
                            <input type="radio"
                                name="productType" //change to static name, dummy
                                value={type.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...newProduct }
                                        copy.productTypeId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                } />
                            <label htmlFor={type.typeName}>{type.typeName}</label>
                        </li>
                        )}
                    </ol>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="pricePerUnit">Price per unit:</label>
                    <input
                        required autoFocus
                        type="float"
                        className="form-control"
                        // placeholder="Input new product unit price"
                        value={newProduct.pricePerUnit}
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.pricePerUnit = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit product
            </button>
        </form>
    )
}
