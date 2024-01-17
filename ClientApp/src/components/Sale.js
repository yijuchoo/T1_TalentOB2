import React, { Component } from 'react';

export class Sale extends Component {
    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], loading: true };
        this.addSale = this.addSale.bind(this);
    }

    componentDidMount() {
        this.populateSaleData();
    }


    static renderSalesTable(sales) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Store Name</th>
                        <th>Store Address</th>
                        <th>Sale Date Time</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale =>
                        <tr key={sale.salesId}>
                            <td>{sale.salesId}</td>
                            <td>{sale.customerName}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.productPrice}</td>
                            <td>{sale.storeName}</td>
                            <td>{sale.storeAddress}</td>
                            <td>{sale.orderDateTime}</td>
                            <td><button>Update Sale</button></td>
                            <td><button>Delete Sale</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Sale.renderSalesTable(this.state.sales);

        return (
            <div>
                <button onClick={this.addSale}>Add Sale</button>
                <h1 id="tableLabel">Sales</h1>
                {contents}
            </div>
        );
    }


    async addSale(id, name, address) {

        this.state = { sales: [], loading: true };


        const data = await fetch(
            'api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                Id: id,
                Name: name,
                Address: address
            })
        }).then((data) => data.json());

        this.setState({ sales: data, loading: false });

    }



    async populateSaleData() {
        const response = await fetch('api/sales');
        const data = await response.json();
        this.setState({ sales: data, loading: false });
    }
}