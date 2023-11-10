import express from "express"

import * as prodcutController from "../controller/productController.js"

const router = express.Router()

router.get("/", prodcutController.getProducts)
router.post("/", prodcutController.createProduct)
router.put("/:id", prodcutController.updateProduct)
router.delete("/:id", prodcutController.deleteProduct)


export default router