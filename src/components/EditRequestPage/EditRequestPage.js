import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Divider from 'muicss/lib/react/divider';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Textarea from 'muicss/lib/react/textarea';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

class EditRequestPage extends Component {

    state = {
        feedback: {
            retailer: '',
            issueType: 'Select One',
            details: '',
        }
    }

    //Handles change in text inputs
    handleChange = (propName, event) => {
        console.log('in handleChange', event);
        this.setState({
            feedback: {
                ...this.state.feedback,
                [propName]: event.target.value
            }
        })
    }

    //Handles selection of option in the dropdown menu
    handleSelect = (event) => {
        console.log('in handleSelect');
        this.setState({
            feedback: {
                ...this.state.feedback,
                issueType: event
            }
        })
    }

    //Sends feedback to Add Feedback Saga to add to DB, sends user to the Confirmation page
    handleAddFeedback = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_FEEDBACK', payload: this.state.feedback})
        this.props.history.push('/confirmation');
    }

    render() {
        return (
            <>
                <h1>Are we missing something? Let us know</h1>
                <h2>At ThreadBare we seek to provide the most accurate and current information as possible.
                Please let us know below what needs to be corrected and we will address as soon as possible.
            </h2>
                <Divider />
                <Form onSubmit={(event) => this.handleAddFeedback(event)}>
                    <legend>Retailer:</legend>
                    <Input value={this.state.feedback.retailer} onChange={(event) => this.handleChange('retailer', event)}/>
                    <legend>Issue Type:</legend>
                    <Dropdown color="accent" label={this.state.feedback.issueType} onSelect={(event) => this.handleSelect(event)}>
                        <DropdownItem value="Wrong Website URL" name="issueType">Wrong Website URL</DropdownItem>
                        <DropdownItem value="Sizes Offered Incorrect" name="issueType">Sizes Offered Incorrect</DropdownItem>
                        <DropdownItem value="Availability Incorrect" name="issueType">Availability Incorrect</DropdownItem>
                        <DropdownItem value="Retailer No Longer Exists" name="issueType">Retailer No Longer Exists</DropdownItem>
                    </Dropdown>
                    <legend>Correct Info:</legend>
                    <Textarea label="Please provide the correct information on this issue" onChange={(event) => this.handleChange('details', event)}/>
                    <Button color="accent" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default connect()(EditRequestPage);