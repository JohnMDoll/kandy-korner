import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetAUser, SaveLoyalty } from "../dataAccess/DataAccess.js"
import "./customers.css"

export const CustomerDetails = () => {
    const { userId } = useParams()
    const [customer, setCustomer] = useState({})
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
            let aCustomer = GetAUser(userId, setCustomer)
            setCustomer(aCustomer[0])
        },
        [userId, feedback]
    )
// between the above UE and the below function, tried different methods of setter function execution. OK?
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        /*
            the feedback function lacks css to make it visible but currently serves as a trigger
            to update the DOM loyalty number to the newly set number
        */
        SaveLoyalty(newCustomer, setFeedback)
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
                onClick={handleSaveButtonClick}
                className="updateLoyalty">
                Update
            </button>
        </section>
    </>
}