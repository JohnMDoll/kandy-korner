import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./customers.css"

export const CustomerDetails = () => {
    const {userId} = useParams()
    const [customer, setCustomer] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${userId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    setCustomer(singleCustomer)
                })
        },
        [userId]
    )

    return <> <h2>Customer Detail View</h2>
    <section className="customer">
    <header>{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Loyalty #: {customer?.loyaltyNumber}</div>
</section>
</>
}