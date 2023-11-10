import fs from "fs"
import { Product } from "../model/product.js"
import path from "path"

const productsFile = path.resolve(process.cwd(), "data", "products.json")

const readProductsFromFile = () => {
    try {
        const rawData = fs.readFileSync(productsFile, "utf-8")
        if(!rawData.trim()) {
            return []
        }
        return JSON.parse(rawData)
    }
    catch(error) {
        console.error('Erreur lors de la lecture ou du parsing du fichier products.json:', error)
        return []
    }
}

const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
}

export const getProducts = (req, res) => {
    const products = readProductsFromFile()
    res.json(products)
}

export const createProduct = (req, res) => {
    const products = readProductsFromFile()
    const product = new Product(Date.now(), req.body.name, req.body.image, req.body.prix, req.body.details)
    products.push(product)

    writeProductsToFile(products)
    res.status(201).json(product)
}

export const updateProduct = (req, res) => {
    const products = readProductsFromFile()
    const product = products.find(p => p.id === parseInt(req.params.id))

    if(!product) return res.status(404).send("Product not found")

    product.name = req.body.name || product.name
    product.image = req.body.image || product.image
    product.prix = req.body.prix || product.prix
    product.details = req.body.details || product.details

    writeProductsToFile(products)

    res.json(product)
}

export const deleteProduct = (req, res) => {
    const products = readProductsFromFile()
    const index = products.findIndex(p => p.id === req.params.id)
    if (!index) return res.status(404).send("Task not found.")
    products.splice(index, 1)
    writeProductsToFile(products)

    res.status(204).send()
}

