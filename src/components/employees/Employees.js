import { useEffect, useState } from "react"
import { json, Navigate, useNavigate } from "react-router-dom"
import "./employees.css"

export const Employees = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [change, didChange] = useState(true)

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
                .then(res => res.json())
                .then(data => setEmployees(data))
                .then(console.log("fetched employees"))
        },
        [change]
    )

    const fireButton = (evt) => {
        return fetch(`http://localhost:8088/employees/${evt.target.name}`, {
                method: "DELETE"
            })
                .then(didChange(!change))
        }

    return <>
        <h2>Employee Directory</h2>
        <button className="Employee__link" to="hiringform" onClick={() => {
            navigate("hiringform", { replace: false })
        }}>Add New Hire</button>

        <article className="employeeList">
            {
                employees.map(employee => {
                    return <section className="employeeListItem" key={`employee--${employee.id}`}>
                        <div>
                            <h3>{employee.user.fullName}</h3>
                            <h5>{employee.user.email}</h5>
                            <h5>Working Location: {employee.location.name}</h5>
                            <h5>Start Date: {employee.startDate}</h5>
                        </div>
                        <button className="fire__button" name={employee.id} onClick={(evt)=>fireButton(evt)}>They Done Messed Up</button>
                    </section>
                }
                )
            }
        </article>

    </>
}