import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, modalTitle: "", CustomerId: 0, CustomerName: "", CustomerAddress: "" };
        this.addCustomer = this.addCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
        this.renderCustomersTable = this.renderCustomersTable.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }


    /*static renderCustomersTable(customers) {*/
    renderCustomersTable(customers) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Serial #</th> {/*Serial Number column*/}
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td> {/*Incremental serial number*/}
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><button type="button" className="btn btn-warning mr-2" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => this.handleEditData(customer.id, customer.name, customer.address)}>Update Customer</button>
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteForm" onClick={() => this.handleDeleteData(customer.id, customer.name)}>Delete Customer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomersTable(this.state.customers);

        return (
            <div>
                <h1 id="tableLabel">Customers</h1>
                <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={this.handleNewData}>Add Customer</button>
                {contents}


                {/*Modal Popup - Add Customer*/}

                <div className="modal fade" id="modalForm" tabindex="-1" aria-labelledby="modalFormLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/*Modal Header*/}
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalFormlLabel">{this.state.modalTitle}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            {/*Modal Body*/}
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label for="customer-name" className="col-form-label">Customer Name</label>
                                        <input required type="text" className="form-control" value={this.state.CustomerName} onChange={this.changeCustomerName} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="customer-address" className="col-form-label">Customer Address</label>
                                        <input required type="text" className="form-control" value={this.state.CustomerAddress} onChange={this.changeCustomerAddress} />
                                    </div>
                                </form>
                            </div>

                            {/*Modal Footer*/}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {this.state.CustomerId === 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.addCustomer(this.state.CustomerName, this.state.CustomerAddress)}>Create</button> : null}


                                {this.state.CustomerId !== 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.addCustomer(this.state.CustomerName, this.state.CustomerAddress)}>Update</button> : null}
                            </div>

                        </div>
                    </div>
                </div>


                {/*Modal Popup - Delete Customer*/}

                <div className="modal fade" id="modalDeleteForm" tabindex="-1" aria-labelledby="modalDeleteFormLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/*Modal Header*/}
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalDeleteFormLabel">Delete Customer</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            {/*Modal Body*/}
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <p>Are you sure to delete customer <strong>{this.state.CustomerName}</strong>?</p>
                                    </div>
                                </form>
                            </div>

                            {/*Modal Footer*/}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.handleDeleteCustomer(this.state.CustomerId)}>Delete</button>
                            </div>

                        </div>
                    </div>
                </div>



            </div>
        );
    }

    /*Handling of CRUD Function*/

    /*ADD FUNCTION*/

    handleNewData() {
        this.setState({
            modalTitle: "Add New Customer",
            CustomerId: 0
        });
    }

    async addCustomer(id, name, address) {

        this.setState({ customers: [], loading: true });


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


    /*EDIT FUNCTION*/

    handleEditData(id, name, address) {
        this.setState({
            modalTitle: "Edit Customer",
            CustomerId: id,
            CustomerName: name,
            CustomerAddress: address
        });
    }

    changeCustomerName = (e) => {
        this.setState({ CustomerName: e.target.value });
    }

    changeCustomerAddress = (e) => {
        this.setState({ CustomerAddress: e.target.value });
    }


    /*DELETE FUNCTION*/

    handleDeleteData(id, name) {
        this.setState({
            modalTitle: "Delete Customer",
            CustomerId: id,
            CustomerName: name
        });
    }

    async handleDeleteCustomer(id) {
        this.setState({ customer: [], loading: true });
        const datacustomer = await fetch('api/customers/' + id, {
            method: 'DELETE',
        }).then((datacustomer) => datacustomer.json());

        console.log(datacustomer)
        this.setState({ customers: datacustomer, loading: false });
    }


    /*GET FUNCTION*/

    async populateCustomerData() {
        try {

            const response = await fetch('api/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            this.setState({ customers: data, loading: false });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false });



        }

    }

    //async populateCustomerData() {
    //    this.setState({ customers: [], loading: true });
    //    const response = await fetch('api/customers');
    //    const data = await response.json();
    //    this.setState({ customers: data, loading: false });
    //}


}