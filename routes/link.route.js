import { Router } from "express";
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireUserToken.js";
import {
  bodyLinkValidator,
  paramsLinkValidator,
} from "../middlewares/validationManager.js";
const router = Router();

router.get("/", requireToken, getLinks);
router.get("/:nanolink", getLink);
router.post("/", requireToken, bodyLinkValidator, createLink);
router.delete("/:id", requireToken, paramsLinkValidator, removeLink);
router.patch(
  "/:id",
  requireToken,
  paramsLinkValidator,
  bodyLinkValidator,
  updateLink
);

export default router;
