import { useEffect } from "react";
import Swal from "sweetalert2";


export const UnAuth = () =>{
    useEffect(() =>{
        Swal.fire({
            title:"Access Denied!",
            text:"You have no permission to access this page",
            icon:"warning",
            allowOutsideClick: true
        })
    })
   
    return(
        <>
            {/* <h1 style={{ color: "red" }}>You have no permission to handle data</h1> */}

        </>
    );
}