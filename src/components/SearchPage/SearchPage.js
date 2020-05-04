import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Divider from 'muicss/lib/react/divider';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';
import Button from 'muicss/lib/react/button';

class SearchPage extends Component {

  state ={
    retailerQuery: '',
    sizeQuery: {
      plus_size: false,
      petite_size: false,
      xshort: false,
      short: false,
      long: false,
      xlong: false
    }
  }

  handleRetailerChange = (event) => {
    console.log('in handleRetailerChange', event.target.value);
    this.setState({
      retailerQuery: event.target.value
    });
  }

  handlePlusChange = () => {
    console.log('in handlePlusChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            plus_size: !this.state.sizeQuery.plus_size
        }
    });
  }

  handlePetiteChange = () => {
    console.log('in handlePetiteChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            petite_size: !this.state.sizeQuery.petite_size
        }
    });
  }

  handleXShortChange = () => {
    console.log('in handleXShortChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            xshort: !this.state.sizeQuery.xshort
        }
    });
  }

  handleShortChange = () => {
    console.log('in handleShortChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            short: !this.state.sizeQuery.short
        }
    });
  }

  handleLongChange = () => {
    console.log('in handleLongChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            long: !this.state.sizeQuery.long
        }
    });
  }

  handleXLongChange = () => {
    console.log('in handleXLongChange');
    this.setState({
        sizeQuery: {
            ...this.state.sizeQuery,
            xlong: !this.state.sizeQuery.xlong
        }
    });
  }

  handleRetailerSearch = (event) => {
    event.preventDefault();
    console.log('in handleRetailerSearch', this.state.retailerQuery);
    this.props.dispatch({type: 'SEARCH_RETAILER', payload: this.state.retailerQuery})
    this.props.history.push('/result');
  }

  handleSizeSearch = (event) => {
    event.preventDefault();
    console.log('in handleSizeSearch', this.state.sizeQuery);
    this.props.dispatch({type: 'SEARCH_SIZE', payload: this.state.sizeQuery})
    this.props.history.push('/result');
  }

  handleGoToList = () => {
    this.props.history.push('/allretailers');
  }

  render() {
    return (
      <>
      <div className="welcome">
        <h1>
          Welcome back, {this.props.user.username}! Let's go shopping.
        </h1>
        <h2>Search our list of retailers to find brands that will fit you perfectly.</h2>
        <h3>To see our current full list of retailers, click <b onClick={this.handleGoToList}>here</b></h3>
        </div>
        <Divider />
        <Form onSubmit={(event) => this.handleRetailerSearch(event)}>
          <legend>Search by Retailer Name:</legend>
          <Input onChange={(event) => this.handleRetailerChange(event)}/>
          <Button color="accent">Find Retailer</Button>
        </Form>
        <h3>OR</h3>
        <Form onSubmit={(event) => this.handleSizeSearch(event)}>
          <legend>Search by Size:</legend>
          <Checkbox type="checkbox" value={this.state.sizeQuery.plus_size} label="Plus Sizes(12-32)" onChange={this.handlePlusChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.petite_size} label="Petite Sizes(00-0)" onChange={this.handlePetiteChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.xshort} label="X-Short Inseam(28 and shorter)" onChange={this.handleXShortChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.short} label="Short Inseam(28-30)" onChange={this.handleShortChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.long} label="Long Inseam(34-36)" onChange={this.handleLongChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.xlong} label="X-Long Inseam(36 and longer)" onChange={this.handleXLongChange}/>
          <Button  color="accent">Find Sizes</Button>
        </Form>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SearchPage);
