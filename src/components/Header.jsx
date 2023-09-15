import React, { useState } from "react";
import {
  Home,
  Menu,
  PersonOutlineOutlined,
  AddShoppingCart,
  AlternateEmail,
  ContactSupport,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Lougout } from "../slices/auth";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  let x = 0;

  let itemsCounter = cart.cartItems.forEach((item) => {
    x += item.qty;
  });
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  const Details = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  return (
    <>
      <AppBar>
        <StyledToolbar>
          <Box display={"flex"}>
            <Menu
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={() => setOpen(!open)}
            />
            <Typography mx={1}>
              <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
                Proshop
              </Link>
            </Typography>
          </Box>
          <Details>
            <Button size="small" color="inherit">
              <Badge badgeContent={x || 0} color="error">
                <Link
                  to={`/cart`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <AddShoppingCart />
                </Link>
              </Badge>
            </Button>
            <Button size="small" color="inherit">
              {userInfo ? (
                <>
                  <Button color="inherit" onClick={() => setAdmin(!admin)}>
                    {userInfo.email}
                  </Button>
                </>
              ) : (
                <>
                  <PersonOutlineOutlined />
                  <Link
                    to={`/login`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </Button>
          </Details>
        </StyledToolbar>
      </AppBar>
      <SwipeableDrawer open={open} onClose={() => setOpen(!open)} anchor="left">
        <List>
          <ListItem>
            <ListItemText>
              <Typography p={2}>welcome to proshop</Typography>
            </ListItemText>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Home color="secondary" />
              </ListItemIcon>
              <ListItemText color="secondary">Home</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText color="secondary">Sign In</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AlternateEmail color="secondary" />
              </ListItemIcon>
              <ListItemText color="secondary">Contact us</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ContactSupport color="secondary" />
              </ListItemIcon>
              <ListItemText color="secondary">About us</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="top"
        open={admin}
        onClose={() => setAdmin(!admin)}
      >
        <List>
          <ListItem>
            <ListItemText>
              <Typography p={2}>{userInfo && userInfo.email}</Typography>
            </ListItemText>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemButton>
              <ListItemText color="secondary">
                <Link
                  to={`/profile`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                dispatch(Lougout());
                setAdmin(false);
              }}
            >
              <ListItemText color="secondary">Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Header;
