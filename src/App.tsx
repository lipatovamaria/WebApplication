import React from 'react';
import Main from "./pages/Main";
import Bmi from "./pages/Bmi";
import Calories from "./pages/Calories";
import {Route, Routes} from "react-router-dom";
import AuthRegistration from "./pages/AuthRegistration";
import {AuthUser, GetUser, SignOutUser} from "./request/UserApi";
import {AddProduct, GetProducts} from "./request/ProductApi";
import UserContext from "./context/UserContext";
import {ProductContext} from "./context/ProductContext";


export type Product = {
    id: string,
    name: string,
    water: number,
    squirrels: number,
    fats: number,
    carbohydrates: number,
    callories: number
}

export type User = {
    username: string
}

type AppState = {
    currentUser: User | null
    products: Product[]
}

class App extends React.Component<any, AppState> {


    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: {
                username: 'none'
            },
            products: []
        }
    }

    async componentDidMount() {
        try {
            let user = await this.LoadUser()
            await this.setState({
                currentUser: user
            })
            let products = await this.LoadProducts()
            await this.setState({
                products: products
            })
        } catch (e) {
            await this.setState({
                currentUser: null,
                products: []
            })
        }
    }

    render() {
        let userContext = {
            user: this.state.currentUser,
            logoutUser: async () => {
                await SignOutUser()
                this.setState({
                    currentUser: null,
                    products: []
                })
            },
            loginUser: async (email: string, password: string) => {
                let user = await AuthUser(email, password)
                let products = await this.LoadProducts()
                this.setState({
                    currentUser: user,
                    products: products
                })
            }
        }
        let productContext = {
            products: this.state.products,
            addProduct: async (product: Product) => {
                let addedProduct = await AddProduct(product)
                this.setState({
                    products: [...this.state.products, addedProduct]
                })
            },
        }
        return <>
            <UserContext.Provider value={userContext}>
                <ProductContext.Provider value={productContext}>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/bmi' element={<Bmi/>}/>
                        <Route path='/calories' element={<Calories/>}/>
                        <Route path='/auth' element={<AuthRegistration/>}/>
                    </Routes>
                </ProductContext.Provider>
            </UserContext.Provider>
        </>;
    }

    LoadProducts = async (): Promise<Product[]> => {
        let loadResult: Product[] = await GetProducts()
        if (loadResult == null) {
            loadResult = []
        }
        return loadResult
    }
    LoadUser = async (): Promise<any> => {
        let loadedUser = await GetUser()
        return loadedUser
    }
}

export default App;
