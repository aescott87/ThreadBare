import React, { Component } from 'react';
import '../App/App.css';
//import MUI CSS elements
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';

class ConfirmationPage extends Component {

    //Sends user to the Add a Retailer page
    handleGoToAdd = () => {
        this.props.history.push('/add');
    }

    //Sends user to the Search page
    handleGoToSearch = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <>
                <h1>Thank you for your submission!</h1>
                <h2>You are helping shoppers just like you find clothing that will make them look and feel great.</h2>
                <Divider />
                <div className="page-buttons">
                    <Panel>
                        <h3>Let us know if there's a retailer we don't know about</h3>
                        <Button color="accent" onClick={this.handleGoToAdd}>Add a Retailer</Button>
                    </Panel>
                    <Panel>
                        <h3>Find your new favorite place to shop</h3>
                        <Button color="accent" onClick={this.handleGoToSearch}>Search</Button>
                    </Panel>
                </div>
            </>
        )
    }
}

export default ConfirmationPage;