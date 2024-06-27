import express from "express";
import {database} from "./db.js"


const app = express();
const PORT = 5000;

app.use (express.json())

app.listen(PORT, console.log('Servidor funcionando en el puerto:', PORT))


// getAllProducts

app.get("/products", (req, res) => {
    res.json(database)
})

//obtener producto especifico por ID
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const findProduct = database.find((productos) => productos.id === productId)
    res.json(findProduct)
})


// POST
app.post("/products", (req, res) => {
    const { id, name, quantity, price} = req.body
    const newProduct = {
        "id": id,
        "name": name,
        "quantity": quantity,
        "price": price,
    };
    database.push(newProduct);
    res.json(newProduct);
    console.log("Producto Creado");
});


//Actualizar producto

app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, quantity, price } = req.body;

    const findProduct = database.find((product) => product.id === productId);

    if (findProduct) {
        findProduct.name = name;
        findProduct.quantity = quantity;
        findProduct.price = price;

        res.json(findProduct);
        console.log("Producto Actualizado");
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});


//Borrar producto
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const findProduct = database.find((productos) => productos.id === productId)
    const indexProduct = database.indexOf(findProduct)
    const deleteProduct = database.splice(indexProduct, 1)
    console.log("Producto eliminado")
})