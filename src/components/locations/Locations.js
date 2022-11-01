import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const Locations = () => {
    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    useEffect(
        ()  => {
                fetch(`http://localhost:8088/locations`)
                    .then(res => res.json())
                    .then((locArr) => {
                        setLocations(locArr)
                    })
            },
            []
    )

return <>
        <h1>List of Locations</h1>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`}>
                            <header>Located at {location.address}</header>
                            <div>(somebody should probably put a picture here or something)</div>
                            <footer>{location.squareFootage} square feet of fun!</footer>
                        </section>
                    }
                )
            }
        </article>
    </>

}
