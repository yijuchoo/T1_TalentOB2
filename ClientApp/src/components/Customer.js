import React, { Component } from 'react';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
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
                <h1 id="tableLabel">Customers</h1>
                <p>Customers data</p>
                {contents}
            </div>
        );
    }

    async populateCustomerData() {
        const response = await fetch('api/customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}