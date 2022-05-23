import { Container } from "@mui/material";
import MenuDrawer from "./MenuDrawer";

export default function Layout(props) {
    const layout = (
        <Container maxWidth="false">
            
            <MenuDrawer {...props} />
            
            {props.children}
            
        </Container>
    )
    return layout;
}