import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (
      <>
        <h1 id="welcome">
          Welcome back, {this.props.user.username}! Let's go shopping.
        </h1>
        <p>Search our list of retailers to find brands that will fit you perfectly.</p>
        <Divider />
        <Form>
          <legend>Search by Retailer:</legend>
          <Input onChange={(event) => this.handleRetailerChange(event)}/>
          <legend>Search by Size:</legend>
          <Checkbox type="checkbox" value={this.state.sizeQuery.plus_size} label="Plus Sizes(12-32)" onChange={this.handlePlusChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.petite_size} label="Petite Sizes(00-0)" onChange={this.handlePetiteChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.xshort} label="X-Short Inseam(28 and shorter)" onChange={this.handleXShortChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.short} label="Short Inseam(28-30)" onChange={this.handleShortChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.long} label="Long Inseam(34-36)" onChange={this.handleLongChange}/>
          <Checkbox type="checkbox" value={this.state.sizeQuery.xlong} label="X-Long Inseam(36 and longer)" onChange={this.handleXLongChange}/>
          <Button color="accent">Search</Button>
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
