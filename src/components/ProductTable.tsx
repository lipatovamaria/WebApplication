import React from "react";
import {ProductContext} from "../context/ProductContext";
import {Product} from "../App";

class ProductTable extends React.Component<any, any> {
    static contextType = ProductContext;

    render() {
        const products: Product[] = this.context.products
        const productsTsx = products.map(product =>
            <React.Fragment key={product.id}>
                <tr className="text">
                    <th className="table-light">{product.name}</th>
                    <th className="table-dark">{product.water}</th>
                    <th className="table-light">{product.squirrels}</th>
                    <th className="table-dark">{product.fats}</th>
                    <th className="table-light">{product.carbohydrates}</th>
                    <th className="table-dark">{product.callories}</th>
                </tr>
            </React.Fragment>)
        return <table className="table table-sm  table-striped table-hover table-bordered border-info" id="table">
            <thead>
            <tr className="table-info ">
                <th>Продукт</th>
                <th>Вода, г</th>
                <th>Белки, г</th>
                <th>Жиры, г</th>
                <th>Углеводы, г</th>
                <th>Ккал</th>
            </tr>
            </thead>
            <tbody>
            {productsTsx}
            </tbody>
        </table>
    }
}

export default ProductTable