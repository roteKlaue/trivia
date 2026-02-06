import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {
    return (<Box display="flex"
        flexDirection="column"
        minHeight="100vh"
        maxHeight={"100vh"}>
        <Navbar />
        <Box component={"main"}
            flex={1}
            padding={2}
            overflow={'auto'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}>
            <Outlet />
        </Box>
        <Footer />
    </Box>);
}

export default Layout;
