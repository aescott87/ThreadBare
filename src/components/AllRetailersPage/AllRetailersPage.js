import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllRetailersPage extends Component {

    componentDidMount() {
        this.getAllRetailers();
    }

    getAllRetailers = () => {
        this.props.dispatch({ type: 'GET_ALL_RETAILERS' });
    }

    render() {
        return (
            <>
                <h1>All Retailers</h1>
                {this.props.retailers.map((retailer) => {
                    return (
                        <Panel className="all-retailers">
                            <p><b>Name:</b>{retailer.name}</p>
                            <p><b>Website:</b>{retailer.website}</p>
                            <p><b>Sizes Carried:</b>{retailer.sizes}</p>
                            <p><b>Where You Can Shop:</b>{retailer.available}</p>
                        </Panel>
                    )
                })}
                <h2>Is there a retailer missing from this list?</h2><h2 onClick={this.handleGoToAdd}>Add to the collection.</h2>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    retailers: reduxStore.getRetailers.getRetailers
});

export default connect(mapStateToProps)(AllRetailersPage);