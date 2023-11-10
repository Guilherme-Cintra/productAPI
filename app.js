import express from "express"
import productRouter from "./routes/product.js"
import mysql from "mysql"
import cors from "cors"
import bodyParser from "body-parser"
const app = express()
const port = 2000

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Guifa200@@',
//     database: 'gestionProduit'
// });
 





app.use(express.json())

app.use(cors())
app.use(bodyParser.json())

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})

app.get("/getAllProducts", function(req, res) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Guifa200@@',
        database: 'gestionProduit'
    });

    con.connect(function(err) {
        if (err) throw err
            
        

        con.query("SELECT * FROM Produit", function (err, result, fields) {
            if (err) throw err
             
                console.log(JSON.stringify(result))
                res.status(200).json(result);
        });
    });
});

app.get("/getProduct/:id", function(req, res) {
    const id = req.params.id
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Guifa200@@',
        database: 'gestionProduit'
    });

    con.connect(function(err) {
        if (err) throw err
        con.query("SELECT * FROM Produit where id =" + id, function (err, result, fields) {
            if (err) throw err
            if (result.length > 0){
                console.log(JSON.stringify(result[0]))
                res.status(200).json({
                    message : "Produit(s) trouvé(s)",
                    data : result[0]
                })
            }
            else {
                console.log("Produit non toruvé")
                res.status(200).json({
                    message : "aucun produit(s) trouvé(s)",
                    data : result[0]
                })
            }
        })
    })
})

// app.post("/createProduct", function(req, res) {
//     const produit = req.body
//     console.log(produit.description + " " + produit.image + " " + produit.prix + " " + produit.details)
//     console.log(JSON.stringify(produit))
//     const con = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Guifa200@@',
//         database: 'gestionProduit'
//     });

//     con.connect(function(err) {
//         if (err) throw err
//         con.query("INSERT INTO PRODUITS VALUES(NULL, '" + produit.description + "', " + produit.image + "', " + produit.prix+ "', " + produit.details + "');", function(err, result, fields)
//         {
//             if (err) throw err
//           res.status(200).send("Produit rajouté")
//         })
//     })
// })


