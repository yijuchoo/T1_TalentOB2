import React, { Component } from 'react';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        this.populateProductData();
    }


    static renderProductsTable(products) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><button>Update Product</button></td>
                            <td><button>Delete Product</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Product.renderProductsTable(this.state.products);

        return (
            <div>
                <button onClick={this.addProduct}>Add Product</button>
                <h1 id="tableLabel">Products</h1>
                {contents}
            </div>
        );
    }


    async addProduct() {

        this.state = { products: [], loading: true };


        const data = await fetch(
            'api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: 'Old Town 3 in 1 Instant White Coffee - Classic',
                Price: 7.50
            })
        }).then((data) => data.json());

        this.setState({ products: data, loading: false });

    }



    async populateProductData() {
        const response = await fetch('api/products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}