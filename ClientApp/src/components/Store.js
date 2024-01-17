import React, { Component } from 'react';

export class Store extends Component {
    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        this.addStore = this.addStore.bind(this);
    }

    componentDidMount() {
        this.populateStoreData();
    }


    static renderStoresTable(stores) {
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
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
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
            : Store.renderStoresTable(this.state.stores);

        return (
            <div>
                <button onClick={this.addStore}>Add Store</button>
                <h1 id="tableLabel">Stores</h1>
                {contents}
            </div>
        );
    }


    async addStore(id, name, address) {

        this.state = { stores: [], loading: true };


        const data = await fetch(
            'api/stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: id,
                Name: name,
                Address: address
            })
        }).then((data) => data.json());

        this.setState({ stores: data, loading: false });

    }



    async populateStoreData() {
        const response = await fetch('api/stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}