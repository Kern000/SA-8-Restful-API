const express = require("express");
const cors = require("cors");
const   {   connectSQL, 
            getConnection
        } = require("./sqlConnection.js");

require("dotenv").config();

const {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    deleteProductByIdService,
    updateProductService
} = require("./service-layer/productsService.js")

const app = express();

app.use(cors());
app.use(express.json());

async function main(){

    await connectSQL(
        process.env.DB_HOST,
        process.env.DB_USER,
        process.env.DB_DATABASE,
        process.env.DB_PASSWORD
    )

    const connection = getConnection();

    app.get("/all-products", async function(req,res){

        try{
            const results = await getAllProductsService();
            if (results.success){
                res.status(200)
                res.json({
                    "products": results.products
                });
            } else {
                res.status(404);
            }
        } catch (error){
            res.status(500).json({"error":error.message});
        }
    })

    app.post("/add-product", async function(req,res){

        console.log(req.body)
        const {name, launchDate, srp, category_id, supplier_id} = req.body;

        try {
            const results = await addProductService(name, launchDate, srp, category_id, supplier_id);
            if (results.success){
                res.status(201)
                res.json({
                    "message": results.message
                });
            } else {
                res.status(400);
            }
        } catch(error) {
            res.status(500).json({"error":error.message});
        }
    })

    app.delete("/delete-product/:productId", async function(req,res){
        const productId = req.params.productId;
        try {
            const results = await deleteProductByIdService(productId);
            if (results.success){
                res.status(202).json({
                    "message": results.message
                });
            } else {
                res.status(404).json({"message": results.message});
            }
        } catch(error) {
            res.status(500).json({"error":error.message});
        }
    })

    app.put("/update-product/:productId", async function(req,res){

        const productId = req.params.productId;
        const {name, launchDate, srp, category_id, supplier_id} = req.body;

        try {
            const results = await updateProductService(productId, name, launchDate, srp, category_id, supplier_id);
            if (results.success){
                res.status(202).json({
                    "message": results.message
                });
            } else {
                res.status(404);
            }
        } catch(error) {
            res.status(500).json({"error":error.message});
        }
    })

    app.get("/update-product/:productId", async function(req,res){

        const productId = req.params.productId;
        try{
            const results = await getProductByIdService(productId);
            if (results.success){
                res.status(200)
                   .json({"products": results.products});
            } else {
                res.status(404).json({"message": results.message});
            }
        } catch (error){
            res.status(500).json({"error":error.message})
        }
    })

}

main();

const port = 3001;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})

