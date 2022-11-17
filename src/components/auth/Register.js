import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DuplicateEmailCheck, RegisterNewUser } from "../dataAccess/DataAccess"
import "./Login.css"

export const Register = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })

    const handleRegister = (e) => {
        e.preventDefault()
        DuplicateEmailCheck(user)
        .then(() => {return navigate("/login")})
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        copy.email = copy.email.toLowerCase()
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Kandy Korner</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

