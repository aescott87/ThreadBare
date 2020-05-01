import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
//import MUI CSS components
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';
import Button from 'muicss/lib/react/button';

class AddRetailerPage extends Component {

    state = {
        name: '',
        website: 'https://',
        sizes: {
            plus_size: false,
            petite_size: false,
            xshort: false,
            short: false,
            long: false,
            xlong: false
        },
        available: {
            inStore: false,
            online: false,
        }
    }

    handleChange = (propertyName, event) => {
        console.log('in handleChange', event.target.value);
        this.setState({
          [propertyName]: event.target.value
        })
    }

    handlePlusChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                plus_size: !this.state.sizes.plus_size
            }
        });
    }

    handlePetiteChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                petite_size: !this.state.sizes.petite_size
            }
        });
    }

    handleXShortChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                xshort: !this.state.sizes.xshort
            }
        });
    }

    handleShortChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                short: !this.state.sizes.short
            }
        });
    }

    handleLongChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                long: !this.state.sizes.long
            }
        });
    }

    handleXLongChange = () => {
        this.setState({
            ...this.state,
            sizes: {
                ...this.state.sizes,
                xlong: !this.state.sizes.xlong
            }
        });
    }

    handleInStoreChange = () => {
        this.setState({
            ...this.state,
            available: {
                ...this.state.available,
                inStore: !this.state.available.inStore
            }
        });
    }

    handleOnlineChange = () => {
        this.setState({
            ...this.state,
            available: {
                ...this.state.available,
                online: !this.state.available.online
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log( 'in handleSubmit', this.state);
        this.props.dispatch({type: 'NEW_RETAILER', payload: this.state})
        this.props.history.push('/home');
    }

    render() {
        return(
            <>
            <h2>Add a Retailer</h2>
            <Form className="add-retailer" onSubmit={(event) => this.handleSubmit(event)}>
                <legend>Name:</legend>
                <Input onChange={(event) => this.handleChange('name', event)}/>
                <legend>Website:</legend>
                <Input defaultValue="https://" onChange={(event) => this.handleChange('website', event)}/>
                <div>
                <legend>Sizes They Carry:</legend>
                <Checkbox type="checkbox" value={this.state.sizes.plus_size} label="Plus Sizes(12-32)" onChange={this.handlePlusChange}/>
                <Checkbox type="checkbox" value={this.state.sizes.petite_size} label="Petite Sizes(00-0)" onChange={this.handlePetiteChange}/>
                <Checkbox type="checkbox" value={this.state.sizes.xshort} label="X-Short Inseam(28 and shorter)" onChange={this.handleXShortChange}/>
                <Checkbox type="checkbox" value={this.state.sizes.short} label="Short Inseam(28-30)" onChange={this.handleShortChange}/>
                <Checkbox type="checkbox" value={this.state.sizes.long} label="Long Inseam(34-36)" onChange={this.handleLongChange}/>
                <Checkbox type="checkbox" value={this.state.sizes.xlong} label="X-Long Inseam(36 and longer)" onChange={this.handleXLongChange}/>
                </div>
                <legend>Where You Can Shop:</legend>
                <Checkbox type="checkbox" value={this.state.available.inStore} label="In Store" onChange={this.handleInStoreChange}/>
                <Checkbox type="checkbox" value={this.state.available.online} label="Online" onChange={this.handleOnlineChange}/>
                <Button type="submit" color="accent">Add</Button>
            </Form>
            </>
        )
    }
}

export default connect()(AddRetailerPage);