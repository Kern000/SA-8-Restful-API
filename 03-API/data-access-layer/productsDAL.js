const {getConnection} = require("../sqlConnection");

async function getAllProductsDAL(){

    const connection = getConnection();

    try {
        let [products] = await connection.execute(
            `
            SELECT Products.*, Suppliers.name AS supplier_name, Categories.name AS category_name
            FROM Products 
            JOIN Suppliers ON Products.supplier_id = Suppliers.supplierId
            JOIN Categories ON Products.category_id = Categories.categoryId
            ORDER BY Products.productId
            `
        )
        return {
            "success": true,
            "products": products
        }
    } catch (error) {
        console.error("fail to fetch products", error);
    }
}


async function addProductDAL(name, launchDate, srp, category_id, supplier_id){

    const connection = getConnection();

    const query = `INSERT INTO Products(name, launchDate, srp, category_id, supplier_id)
                    VALUES(?, ?, ?, ?, ?)`;
     
    try {
        await connection.execute(query, [name, launchDate, srp, category_id, supplier_id]);
        return {
            "success": true,
            "message": "Successful add"
        }
    } catch (error) {
        console.error("fail to add product", error);
    }
}

async function deleteProductByIdDAL(productId){

    const connection = getConnection();

    const selectProductQuery = `SELECT * FROM Products WHERE productId = ?`
   
    try {
        let [found] = await connection.execute(selectProductQuery, [productId]);
        if (found.length == 0){
            return {
                "success": false,
                "message": "Unable to delete. No matching product found."
            };
        }
    } catch (error){
        console.error("fail to delete product", error);
    }

    const deleteQuery = `DELETE FROM Products WHERE productId = ?`
    try {
        await connection.execute(deleteQuery, [productId])
        return {
            "success": true,
            "message": "Successful delete"
        }
    } catch (error){
        console.error("fail to delete product", error);
    }
}


async function updateProductDAL(productId, name, launchDate, srp, category_id, supplier_id){

    const connection = getConnection();

    const updateQuery = `UPDATE Products SET name = ?, launchDate = ?, srp = ?, category_id = ?, supplier_id = ? WHERE productId = ?`

    try {
        await connection.execute(updateQuery, [name, launchDate, srp, category_id, supplier_id, productId]);
        return {
            "success": true,
            "message": "Successful update"
        }
    } catch (error){
        console.error("fail to update", error);
    }
}

async function getProductByIdDAL(productId){

    const connection = getConnection();
    const searchQuery = `SELECT name, launchDate, srp, category_id, supplier_id FROM Products WHERE productId = ?`;

    try {
        
        let found = await connection.execute(searchQuery, [productId]);
        if (found.length == 0) {
            return {    "success": false,
                        "message": "product not found"
                    };
        }
        return {
            "success": true,
            "products": found[0]
        }
    } catch (error) {
        throw new Error ("error fetching", error)
    }
}

module.exports = {
    getAllProductsDAL,
    getProductByIdDAL,
    addProductDAL,
    deleteProductByIdDAL,
    updateProductDAL
}

