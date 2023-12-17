import React, { Component } from 'react';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, id: '', name: '', address:'' };
        this.addCustomer = this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }


    static renderCustomersTable(customers) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><button>Update Customer</button></td>
                            <td><button>Delete Customer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customer.renderCustomersTable(this.state.customers);

        return (
            <div>
                <button onClick={this.addCustomer}>Add Customer</button>
                <h1 id="tableLabel">Customers</h1>
                {contents}
            </div>
        );
    }


    async addCustomer(id, name, address) {

        this.state = { customers: [], loading: true };


        const data = await fetch(
            'api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: id,
                Name: name,
                Address: address
            })
        }).then((data) => data.json());

        this.setState({ customers: data, loading: false });

    }



    async populateCustomerData() {
        const response = await fetch('api/customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}