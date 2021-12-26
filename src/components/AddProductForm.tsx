import React from "react";
import {AddProduct} from "../request/ProductApi";
import * as yup from "yup";
import {Product} from "../App";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import UserContext from "../context/UserContext";
import {ProductContext} from "../context/ProductContext";

interface ProductForm {
    productName: string,
    water: number,
    squirrels: number,
    fats: number,
    carbohydrates: number,
    callories: number
}

const productInitValues: ProductForm = {
    productName: "",
    water: 0,
    squirrels: 0,
    fats: 0,
    carbohydrates: 0,
    callories: 0
}

const InputNames = {
    nameInputName: 'productName',
    waterInputName: 'water',
    squirrelsInputName: 'squirrels',
    fatsInputName: 'fats',
    carbohydratesInputName: 'carbohydrates',
    calloriesInputName: 'callories',

}

const productSchema = yup.object({
    productName: yup.string()
        .required("Имя продукта не может быть пустым!"),
    water: yup.number()
        .typeError("Пораметр 'вода' должен быть числом!")
        .required("Пораметр 'вода' не может быть пустым!")
        .min(0, "Пораметр 'вода' не может быть меньше 0!"),
    squirrels: yup.number()
        .typeError("Пораметр 'белки' должен быть числом!")
        .required("Пораметр 'белки' не может быть пустым!")
        .min(0, "Пораметр 'белки' не может быть меньше 0!"),
    fats: yup.number()
        .typeError("Пораметр 'жиры' должен быть числом!")
        .required("Пораметр 'жиры' не может быть пустым!")
        .min(0, "Пораметр 'жиры' не может быть меньше 0!"),
    carbohydrates: yup.number()
        .typeError("Пораметр 'углеводы' должен быть числом!")
        .required("Пораметр 'углеводы' не может быть пустым!")
        .min(0, "Пораметр 'углеводы' не может быть меньше 0!"),
    callories: yup.number()
        .typeError("Пораметр 'каллории' должен быть числом!")
        .required("Пораметр 'каллории' не может быть пустым!")
        .min(0, "Пораметр 'каллории' не может быть меньше 0!")
});

class AddProductForm extends React.Component<any, any> {
    static contextType = ProductContext;

    render() {
        return <>
            <Formik initialValues={productInitValues}
                    onSubmit={this.addProduct}
                    validationSchema={productSchema}>
                {(formikProps: FormikProps<ProductForm>) => (
                    <Form>
                        <p>Название:
                            <input className={formikProps.errors.productName && formikProps.touched.productName ?
                                       "form-control is-invalid" : "form-control"}
                                   name={InputNames.nameInputName}
                                   value={formikProps.values.productName}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Название"/>
                            {(formikProps.errors.productName && formikProps.touched.productName) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.productName}
                            </div>}
                        </p>
                        <p>Количество воды:
                            <input className={formikProps.errors.water && formikProps.touched.water ?
                                "form-control is-invalid" : "form-control"}
                                   name={InputNames.waterInputName}
                                   value={formikProps.values.water}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Количество воды"/>
                            {(formikProps.errors.water && formikProps.touched.water) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.water}
                            </div>}
                        </p>
                        <p>Количество белков:
                            <input className={formikProps.errors.squirrels && formikProps.touched.squirrels ?
                                "form-control is-invalid" : "form-control"}
                                   name={InputNames.squirrelsInputName}
                                   value={formikProps.values.squirrels}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Количество белков"/>
                            {(formikProps.errors.squirrels && formikProps.touched.squirrels) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.squirrels}
                            </div>}
                        </p>
                        <p>Количество жиров:
                            <input className={formikProps.errors.fats && formikProps.touched.fats ?
                                "form-control is-invalid" : "form-control"}
                                   name={InputNames.fatsInputName}
                                   value={formikProps.values.fats}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Количество жиров"/>
                            {(formikProps.errors.fats && formikProps.touched.fats) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.fats}
                            </div>}
                        </p>
                        <p>Количество углеводов:
                            <input className={formikProps.errors.carbohydrates && formikProps.touched.carbohydrates ?
                                "form-control is-invalid" : "form-control"}
                                   name={InputNames.carbohydratesInputName}
                                   value={formikProps.values.carbohydrates}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Количество углеводов"/>
                            {(formikProps.errors.carbohydrates && formikProps.touched.carbohydrates) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.carbohydrates}
                            </div>}
                        </p>
                        <p>Количество Ккал:
                            <input className={formikProps.errors.callories && formikProps.touched.callories ?
                                "form-control is-invalid" : "form-control"}
                                   name={InputNames.calloriesInputName}
                                   value={formikProps.values.callories}
                                   onChange={formikProps.handleChange}
                                   onBlur={formikProps.handleBlur}
                                   placeholder="Количество Ккал"/>
                            {(formikProps.errors.callories && formikProps.touched.callories) &&
                            <div className="invalid-feedback">
                                {formikProps.errors.callories}
                            </div>}
                        </p>
                        <button type="submit">Загрузить</button>
                    </Form>)}
            </Formik>
        </>
    }

    addProduct = async (values: ProductForm, {setSubmitting, resetForm}: FormikHelpers<ProductForm>) => {
        const product: Product = {
            id: "",
            name: values.productName,
            water: values.water,
            squirrels: values.squirrels,
            fats: values.fats,
            carbohydrates: values.carbohydrates,
            callories: values.callories
        }
        await this.context.addProduct(product)
        setSubmitting(false)
        resetForm()
    }
}

export default AddProductForm