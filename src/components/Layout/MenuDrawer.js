import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';

import productLogo from '../../../public/static/img/head-logo.png'

export default function MenuDrawer({ cobaltData }) {

    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <React.Fragment>
                <AppBar position="sticky">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <Box m={2}>
                            <Image src={productLogo}></Image>
                        </Box>
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <SearchIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleDrawerToggle}
                >
                </Drawer>
            </React.Fragment>
            <Toolbar sx={{ display: { sm: 'block', md: 'none' } }} />
        </div>
    );
}