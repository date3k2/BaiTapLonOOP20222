import React from "react";
import { Button } from "react-bootstrap";

export default function LoadingButton({color}) {
    return (
        <Button variant={color}>
          <span class="spinner-border spinner-border-sm"></span>
          Loading ...
        </Button>
    )
}
