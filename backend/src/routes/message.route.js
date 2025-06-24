import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteMessage, editMessage, getMessages, getUsersForSidebar, reactToMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);  
router.post("/send/:id", protectRoute, sendMessage);
router.put("/edit/:id", protectRoute, editMessage);
router.delete("/delete/:id", protectRoute, deleteMessage);
router.post("/react/:id", protectRoute, reactToMessage);
// router.delete("/react/:messageId", protectRoute, removeReaction);
// router.post("/reply/:messageId", protectRoute, replyToMessage);
// router.post("/seen", protectRoute, seen);


export default router;