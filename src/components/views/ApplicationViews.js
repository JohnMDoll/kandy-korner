import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { Products } from "../products/Products"
import { ProductForm } from "../products/ProductForm"


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
				<Route path="products/createProduct" element={ <ProductForm /> } />

            </Route>
        </Routes>
    )
}

