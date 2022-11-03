import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export const HiringForm = () => {
    const [newUser, updateNewUser] = useState({isStaff: true})
    const [newEmployee, updateNewEmployee] = useState({})
    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locArr) => setLocations(locArr))
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userDataToSendToAPI =
        {
            fullName: "",
            email: "1",
            isStaff: false
        }
        const employeeDataToSendToAPI =
        {
            locationId: 0,
            startDate: 0,
            payRate: 0
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            //.then(user => employeeDataToSendToAPI.userId = user.id)
            .then(user => {
                newEmployee.userId = user.id
                return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEmployee)
                })
            })
            // .then(res => console.log(res.json())) this doesn't actually do anything
            .then(() => {
                navigate("/employees")
            })
    }

    return <>
        <h1>words</h1>
        <h4>there's supposed to be a form to fill and submit to add new employees to the employee directory</h4>
        <h6>please help</h6>
       
        <form className="hiringForm">
            <h2 className="hiringForm__title">New Employee Entry</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        onChange={
                            (evt) => {
                                const copy = { ...newUser }
                                copy.fullName = evt.target.value
                                updateNewUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        onChange={
                            (evt) => {
                                const copy = { ...newUser }
                                copy.email = evt.target.value.toLowerCase()
                                updateNewUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location:</label>
                    <select required autoFocus className="locationList" onChange={
                        (evt) => {
                            const copy = { ...newEmployee }
                            copy.locationId = parseInt(evt.target.value)
                            updateNewEmployee(copy)
                        }
                    }
                    ><option name="locationList" className="form-control" value="">Which Location is Employee Joining?</option>
                        {
                            locations.map((location) => {
                                return <option
                                    name="locationList"
                                    className="form-control"
                                    value={location.id}
                                    key={`location--${location.id}`}
                                >{location.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Email address"
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.startDate = evt.target.value
                                updateNewEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        step=".01"
                        className="form-control"
                        placeholder="$##.##"
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.payRate = evt.target.value
                                updateNewEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
        </form>
        <button className="addEmployee" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit Info</button>
    </>
}