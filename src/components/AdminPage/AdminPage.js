import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Button from 'muicss/lib/react/button';

class AdminPage extends Component {

    componentDidMount() {
        this.getAllRetailers();
    }

    getAllRetailers = () => {
        this.props.dispatch({ type: 'GET_ALL_RETAILERS' });
    }

    render() {
        console.log('retailers are', this.props.retailers);
        return (
            <>
                <h1>All Retailers</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Retailer Name</th>
                            <th>Website</th>
                            <th>Sizes</th>
                            <th>Available</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.retailers.map((retailer) => {
                            return (
                                <tr>

                                    <>
                                        <td>{retailer.name}</td>
                                        <td>{retailer.website}</td>
                                        <td>{retailer.sizes}</td>
                                        <td>{retailer.available}</td>
                                        <td><Button color="primary">Edit</Button></td>
                                        <td><Button color="primary">Delete</Button></td>
                                    </>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    retailers: reduxStore.getRetailers.getRetailers
});

export default connect(mapStateToProps)(AdminPage);