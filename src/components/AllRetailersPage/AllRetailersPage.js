import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Panel from 'muicss/lib/react/panel';

class AllRetailersPage extends Component {

    //Renders full list of retailers upon page load
    componentDidMount() {
        this.getAllRetailers();
    }

    //Gets all retailers from the DB
    getAllRetailers = () => {
        this.props.dispatch({ type: 'GET_ALL_RETAILERS' });
    }

    //Sends user to the Add a Retailer page
    handleGoToAdd = () => {
        this.props.history.push('/add');
    }

    //Sends user to the Edit Request form
    handleGoToEdit = () => {
        this.props.history.push('/edit');
    }

    render() {
        return (
            <>
                <h1>All Retailers</h1>
                <div className="all-retailers">
                    {this.props.retailers.map((retailer) => {
                        return (
                            <Panel className="retailer">
                                <p><b>Name:</b>{retailer.name}</p>
                                <p><b>Website:</b>{retailer.website}</p>
                                <p><b>Sizes Carried:</b></p>
                                {retailer.sizes.map((size) => {
                                    return (
                                        <ul>
                                            <li>{size}</li>
                                        </ul>
                                    )
                                })}
                                <p><b>Where You Can Shop:</b></p>
                                {retailer.available.map((item) => {
                                    return (
                                        <ul>
                                            <li>{item}</li>
                                        </ul>
                                    )
                                })}
                            </Panel>
                        )
                    })}
                </div>
                <h2>Is there a retailer missing from this list?</h2> <h2><b onClick={this.handleGoToAdd}>Add</b> to the collection.</h2>
                <h2>See something wrong?</h2> <h2>Let us know <b onClick={this.handleGoToEdit}>here.</b></h2>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    retailers: reduxStore.getRetailers.getRetailers
});

export default connect(mapStateToProps)(AllRetailersPage);