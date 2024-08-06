import express from "express";
// import { isAdminRoute, protectedRoute } from "../middlewares/authMiddleware.js";
import { signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
