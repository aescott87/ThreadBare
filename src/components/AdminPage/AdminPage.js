import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';

class AdminPage extends Component {

    state = {
        editPanel: false,
        editedRetailer: null,
    }

    toggleEditPanel = (retailer) => {
        console.log('in toggleEditPanel');
        this.setState({
            editPanel: !this.state.editPanel,
            editedRetailer: retailer
        });
    }

    componentDidMount() {
        this.getAllRetailers();
    }

    getAllRetailers = () => {
        this.props.dispatch({ type: 'GET_ALL_RETAILERS' });
    }

    handleChange = (propName, event) => {
        console.log('in handleChange', event.target.value);
        this.setState({
            editedRetailer: { ...this.state.editedRetailer, [propName]: event.target.value }
        })
    }

    handleSizeChange = (sizeName) => {
        if (this.state.editedRetailer.sizes.includes(sizeName)) {
            this.setState({
                editedRetailer: {
                    ...this.state.editedRetailer,
                    sizes: this.state.editedRetailer.sizes.filter((size) => {
                        return size !== sizeName
                    })
                }
            })
        } else {
            this.setState({
                editedRetailer: {
                    ...this.state.editedRetailer,
                    sizes: [sizeName, ...this.state.editedRetailer.sizes]
                }
            })
        }
    }

    handleAvailableChange = (availableName) => {
        if (this.state.editedRetailer.available.includes(availableName)) {
            this.setState({
                editedRetailer: {
                    ...this.state.editedRetailer,
                    available: this.state.editedRetailer.available.filter((availability) => {
                        return availability !== availableName
                    })
                }
            })
        } else {
            this.setState({
                editedRetailer: {
                    ...this.state.editedRetailer,
                    available: [availableName, ...this.state.editedRetailer.available]
                }
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');
        this.props.dispatch({ type: 'EDIT_RETAILER', payload: this.state.editedRetailer })
        this.setState({
            editPanel: false
        });
    }

    handleDelete = (retailer) => {
        this.props.dispatch({ type: 'DELETE_RETAILER', payload: retailer })
    }

    render() {
        return (
            <>
                <div className="all-retailers">
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
                                        <td>{retailer.name}</td>
                                        <td>{retailer.website}</td>
                                        <td>
                                            {retailer.sizes.map((size) => {
                                                return (
                                                    <ul>
                                                        <li>{size}</li>
                                                    </ul>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            {retailer.available.map((item) => {
                                                return (
                                                    <ul>
                                                        <li>{item}</li>
                                                    </ul>
                                                )
                                            })}
                                        </td>
                                        <td><Button color="primary" onClick={() => this.toggleEditPanel(retailer)}>Edit</Button></td>
                                        <td><Button color="primary" onClick={() => this.handleDelete(retailer)}>Delete</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {this.state.editPanel ? <>
                    <h2>Enter Changes Below</h2>
                    <Form className="edit-retailer" onSubmit={(event) => this.handleSubmit(event)}>
                        <legend>Name:</legend>
                        <p>{this.state.editedRetailer.name}</p>
                        <legend>Website:</legend>
                        <Input value={this.state.editedRetailer.website} onChange={(event) => this.handleChange('website', event)} />
                        <div>
                            <legend>Sizes They Carry:</legend>
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('Plus Sizes (12-32)')} label="Plus Sizes(12-32)" onChange={() => this.handleSizeChange('Plus Sizes (12-32)')} />
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('Petite Sizes (00-0)')} label="Petite Sizes(00-0)" onChange={() => this.handleSizeChange('Petite Sizes (00-0)')} />
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('X-Short Inseam (28" or less)')} label="X-Short Inseam(28 and shorter)" onChange={() => this.handleSizeChange('X-Short Inseam (28" or less)')} />
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('Short Inseam (28"-30")')} label="Short Inseam(28-30)" onChange={() => this.handleSizeChange('Short Inseam (28"-30")')} />
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('Long Inseam (34"-36")')} label="Long Inseam(34-36)" onChange={() => this.handleSizeChange('Long Inseam (34"-36")')} />
                            <Checkbox type="checkbox" checked={this.state.editedRetailer.sizes.includes('X-Long Inseam (36" or more)')} label="X-Long Inseam(36 and longer)" onChange={() => this.handleSizeChange('X-Long Inseam (36" or more)')} />
                        </div>
                        <legend>Where You Can Shop:</legend>
                        <Checkbox type="checkbox" checked={this.state.editedRetailer.available.includes('In Store')} label="In Store" onChange={() => this.handleAvailableChange('In Store')} />
                        <Checkbox type="checkbox" checked={this.state.editedRetailer.available.includes('Online')} label="Online" onChange={() => this.handleAvailableChange('Online')} />
                        <Button type="submit" color="accent">Update</Button>
                    </Form>
                </> : null}
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    retailers: reduxStore.getRetailers.getRetailers
});

export default connect(mapStateToProps)(AdminPage);