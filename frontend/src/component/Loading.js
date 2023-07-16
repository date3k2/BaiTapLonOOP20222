import React from "react";

export default function Loading() {
    return (
        <div class="d-flex ">
            <div class="spinner-border text-secondary" role="status">
            </div>
            <p style={{marginLeft:"1rem", fontSize: "18px"}}> Loading ...</p>
        </div>      
    )
}

