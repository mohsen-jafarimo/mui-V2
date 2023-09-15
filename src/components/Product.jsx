import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  IncreaseQty,
  DecreaseQty,
  RemoveItem,
} from "../slices/cartSlice";
import { isInCart, itemQty } from "../utils/buttons";
import { Delete } from "@mui/icons-material";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          objectFit: "contain",
          alignSelf: "center",
          maxWidth: "200px",
          maxHeight: "200px",
        }}
        image={product.image}
        title={product.title}
      />
      <CardContent sx={{ alignSelf: "center" }}>
        <Typography>{product.title.substring(0, 12)}</Typography>
        <Typography color="gray">$ {product.price}</Typography>
        <Typography
          bgcolor={"GrayText"}
          padding={2}
          sx={{ borderRadius: "10px" }}
          color={"white"}
        >
          {product.category}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifySelf: "center", alignSelf: "center" }}>
        {isInCart(cart.cartItems, product.id) ? (
          <Button
            sx={{ borderRadius: "7px" }}
            onClick={() => dispatch(IncreaseQty(product.id))}
          >
            +
          </Button>
        ) : (
          <Button
            sx={{ borderRadius: "7px" }}
            onClick={() => dispatch(addItem(product))}
          >
            Add to cart
          </Button>
        )}

        <Typography>{itemQty(cart.cartItems, product.id)}</Typography>
        {itemQty(cart.cartItems, product.id) === 1 && (
          <Button onClick={() => dispatch(RemoveItem(product.id))}>
            <Delete color="error" />
          </Button>
        )}
        {itemQty(cart.cartItems, product.id) > 1 && (
          <Button onClick={() => dispatch(DecreaseQty(product.id))}>-</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
