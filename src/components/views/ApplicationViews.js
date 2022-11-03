import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { Products } from "../products/Products"
import { ProductForm } from "../products/ProductForm"
import { ProductSearch } from "../products/ProductSearch"
import { Employees } from "../employees/Employees"
import { HiringForm } from "../employees/HiringForm"


export const ApplicationViews = () => {
	return (
		<Routes>
		<Route path="/"  element= {	
			<>
			<h1>Kandy Korner</h1>
			
			<Outlet />
			</>
		}>
			
				<Route path="products" element={ <Products /> } />
                <Route path="locations" element={ <Locations /> } />
				<Route path="products/productsearch" element={ <ProductSearch /> } />
				<Route path="products/createProduct" element={ <ProductForm /> } />
				<Route path="employees" element={ <Employees /> } />
				<Route path="employees/hiringform" element={ <HiringForm /> } />

            </Route>
        </Routes>
    )
}

