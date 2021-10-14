import { getThemeProps } from "@mui/system";
import { Navbar } from "./Navbar";


function Sitelayout(props) {
    return (
        <>
        <Navbar>{props.children}</Navbar>
           
        </>    
    )
}

export { Sitelayout };