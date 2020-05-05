import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Divider from 'muicss/lib/react/divider';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

class EditRequestPage extends Component {
    render() {
        return(
            <>
            <h1>Are we missing something? Let us know</h1>
            <h2>At ThreadBare we seek to provide the most accurate and current information as possible.
                Please let us know below what needs to be corrected and we will address as soon as possible.
            </h2>
            <Divider />
            <Form>
                <legend>Retailer:</legend>
                <Input />
                <legend>What is the Issue?</legend>
                <Textarea label="Provide as much detail as possible" />
                <Button color="accent">Submit</Button>
            </Form>
            </>
        )
    }
}

export default connect()(EditRequestPage);