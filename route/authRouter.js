import express from "express";
import {registerUser , login , getUser , logout , deleteUserByEmail , UpdateUser } from "../controller/authController.js";
const route = express(); 
//JWT (jsonwebtoken) authenticate
const token = (req, res) => {};
  route.get( token, (req, res) => {
    res.json({ message: 'authentigation error' });
  });
route.post("/sign-up",registerUser);
route.post("/log-in",login);
route.post("/get-User",getUser);
route.get("/logout", logout);
route.post("/users:email", deleteUserByEmail);
route.post("/user/update/:id", UpdateUser);
export default route;
