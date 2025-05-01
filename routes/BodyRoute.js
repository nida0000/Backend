import express from "express";
import {
  setOrUpdateBodyShape,
  getBodyShape,
} from '../controllers/BodyController.js'

const router = express.Router();

// POST or UPDATE body shape analysis
router.post("/", setOrUpdateBodyShape);

// GET body shape analysis by UID
router.get("/:uid", getBodyShape);

export default router;
