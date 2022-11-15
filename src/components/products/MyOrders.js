import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export const MyOrders = () => {
    const { userId } = useParams()
    const [myOrders, getMyOrders] = useState([])

    useEffect (
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product&userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                getMyOrders(data)
            })
        },
        []
    )

    return <>
            <article className="products">
            {
                myOrders.map(
                    (order) => {
                        return <section className="orderContainer" key={`order--${order.id}`}>
                            <section className="order">
                            <header>{order.product.name}</header>
                            <footer>${order.product.pricePerUnit} each</footer>
                            </section>
                        </section>

                    }
                )
            }
        </article>
    </>

}