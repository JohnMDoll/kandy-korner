import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localUser)
    
    return (
        <ul className="navbar">
            <ul className="welcome">Ye Olde Kandy Shoppe</ul>
            <li className="navbar__item navbar__locations">
                <Link className="navbar__link" to="locations" onClick={() => {
                    navigate("locations", { replace: false })
                }}>Locations</Link>
            </li>
            <>
                {
                    kandyUserObject.staff
                        ?
                        <>
                            <li className="navbar__item navbar__products">
                                <Link className="navbar__link" to="products" onClick={() => {
                                    navigate("products", { replace: false })
                                }}>Products</Link>
                            </li>
                            <li className="navbar__item navbar__products">
                                <Link className="navbar__link" to="employees" onClick={() => {
                                    navigate("employees", { replace: false })
                                }}>Employee</Link>
                            </li>
                        </>
                        :
                        <>
                        <li className="navbar__item navbar__findproducts">
                                <Link className="navbar__link" to="products/productsearch" onClick={() => {
                                    navigate("products/productsearch", { replace: false })
                                }}>Find Candy</Link>
                            </li>
                        </>
                }
            </>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}

