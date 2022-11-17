import { useNavigate } from "react-router-dom"

//module holding all fetch calls for project


// Login.js line 13
export const LoginMatch = (email) => {

    // let navigate = useNavigate()

    return fetch(`http://localhost:8088/users?email=${email.toLowerCase()}`)
        .then(res => res.json())
        .then(foundUsers => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem("kandy_user", JSON.stringify({
                    id: user.id,
                    staff: user.isStaff
                }))
            }
            else {
                window.alert("Invalid login")
            }
        })
}

// Register.js function to register a new user
export const RegisterNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("kandy_user", JSON.stringify({
                    id: createdUser.id,
                    staff: createdUser.isStaff
                }))

            }
        })
}
// Register.js for ensuring new account not registered with dupe email account
export const DuplicateEmailCheck = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email.toLowerCase()}`)
        .then(res => res.json())
        .then(response => {
            if (response.length > 0) {
                // Duplicate email. No good.
                window.alert("Account with that email address already exists")
            }
            else {
                // Good email, create user.
                RegisterNewUser(user)
            }
        })
}
// CustomerDetails.js for fetching 1 user based on selected userId
export const GetAUser = (userId, setCustomer) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${userId}`)
        .then(res => res.json())
        .then(data => setCustomer(data[0])) //un-array response data and set customer object data
}

// CustomerDetails.js saves an uupdated customer Loyalty Number to db
export const SaveLoyalty = (newCustomer, setFeedback) => {
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


