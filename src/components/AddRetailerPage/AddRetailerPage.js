import React, {Component} from 'react';
//import MUI CSS components
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';
import Button from 'muicss/lib/react/button';

class AddRetailerPage extends Component {
    render() {
        return(
            <>
            <h2>Add a Retailer</h2>
            <Form>
                <legend>Name:</legend>
                <Input />
                <legend>Website:</legend>
                <Input defaultValue="https://" />
                <legend>Sizes They Carry:</legend>
                <Checkbox label="Plus Sizes(12-32)" />
                <Checkbox label="Petite Sizes(00-0)" />
                <Checkbox label="X-Short Inseam(28 and shorter)" />
                <Checkbox label="Short Inseam(28-30)" />
                <Checkbox label="Long Inseam(34-36)" />
                <Checkbox label="X-Long Inseam(36 and longer)" />
                <legend>Where You Can Shop:</legend>
                <Checkbox label="In Store" />
                <Checkbox label="In Select Stores" />
                <Checkbox label="Online" />
                <Button type="submit" color="accent">Add</Button>
            </Form>
            </>
        )
    }
}

export default AddRetailerPage;