import { useEffect, useState } from "react"
import { json, Link, Navigate, useNavigate } from "react-router-dom"
import "./customers.css"

export const Customers = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then(data => setCustomers(data))
        },
        []
    )

    return <>
        <h2>Customer Directory</h2>
        {/* <button className="customer__link" to="hiringform" onClick={() => {
            navigate("hiringform", { replace: false })
        }}>Add New Hire</button> */}

        <article className="customerList">
            {
                customers.map(customer => {

                    return <div className="customerListItem" key={`customer--${customer?.id}`}>
                        <div>
                            <h3><Link to={`/customers/${customer?.userId}`}>{customer?.user?.fullName}</Link></h3>
                        </div>
                        <div>

                        </div>
                        <h5>{customer?.user?.email}</h5>
                    </div>
                }
                )
            }
        </article>

    </>
}