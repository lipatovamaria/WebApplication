import React from "react";
import ProductTable from "../components/ProductTable";
import AddProductForm from "../components/AddProductForm";
import UserContext from "../context/UserContext";

class Calories extends React.Component<any, any> {
    static contextType = UserContext;

    render() {
        let currentUser = this.context.user
        if(currentUser == null) {
            document.location.href="/auth";
        }
        return <>
            <div className="container-fluid">
                <div className="row" style={{height: "130px"}}>
                    <h1>Калорийность продуктов</h1>
                </div>
            </div>

            <div className="container">
                <ProductTable/>
            </div>

            <div className="container">
                <div className="row">
                    <p className="text">Добавить свой продукт:</p>
                </div>
                <AddProductForm/>
            </div>
        </>;
    }
}

export default Calories