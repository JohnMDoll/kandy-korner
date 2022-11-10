import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./customers.css"

export const CustomerDetails = () => {
    const { userId } = useParams()
    const [customer, setCustomer] = useState()
    const [newCustomer, setNewLoyalty] = useState(
        {id: "", loyaltyNumber: "", userId: ""}
    )
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${userId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    setCustomer(singleCustomer)
                })
        },
        [userId, feedback]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        return fetch(`http://localhost:8088/customers/${newCustomer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("Loyalty Number Updated!")
            })
    }

    return <> <h2>Customer Detail View</h2>
        <section className="customer">
            <header>{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Loyalty #: {customer?.loyaltyNumber}</div>
            <label htmlFor="loyaltyNum">Update Loyalty Number:</label>
            <input type="number"
                        className="loyalty--update"
                        value={newCustomer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...customer }
                                copy.loyaltyNumber = parseInt(evt.target.value)
                                setNewLoyalty(copy)
                            }
                        } />
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="updateLoyalty">
                Update
            </button>
        </section>
    </>
}