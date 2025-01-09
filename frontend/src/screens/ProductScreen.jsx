import { useParams } from "react-router-dom";
import { Products } from "../utils/MockData";

function ProductScreen() {
const {id}= useParams() 
const product = Products.find (product => product._id === id);
console.log(product)


    return (
        <>
        </>
    )
}

export default ProductScreen;