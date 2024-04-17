const   {
            getAllProductsDAL,
            getProductByIdDAL,
            addProductDAL,
            deleteProductByIdDAL,
            updateProductDAL
        } = require("../data-access-layer/productsDAL");

const getAllProductsService = async () => {
    let results = await getAllProductsDAL();
    return results;
}

const addProductService = async(name, launchDate, srp, category_id, supplier_id) => {   

    let results = await addProductDAL(name, launchDate, srp, category_id, supplier_id);
    return results;
}

const deleteProductByIdService = async(productId) => {
    let results = await deleteProductByIdDAL(productId);
    return results;
}

const updateProductService = async(productId, name, launchDate, srp, category_id, supplier_id) =>{
    let results = await updateProductDAL(productId, name, launchDate, srp, category_id, supplier_id);
    return results;
}

const getProductByIdService = async(productId) => {    
    let results = await getProductByIdDAL(productId);
    return results;
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    deleteProductByIdService,
    updateProductService
}