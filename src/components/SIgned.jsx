import React from 'react'
import { Link } from 'react-router-dom'
import "./Signed-in.css"
export function Signed(){
    return(
        <>
        <h1>Signed-in Succesfull </h1>
        <h2>Get back to home page</h2>
        <Link to='/'>Home</Link>
        </>
    )
}