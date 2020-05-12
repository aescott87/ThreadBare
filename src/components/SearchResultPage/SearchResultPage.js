import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Panel from 'muicss/lib/react/panel';

class SearchResultPage extends Component {

  //Sends user to Add a Retailer page
  handleGoToAdd = () => {
    this.props.history.push('/add');
  }

  //Sends user to Search page
  handleGoToSearch = () => {
    this.props.history.push('/home');
  }

  //Sends user to Edit Request form
  handleGoToEdit = () => {
    this.props.history.push('/edit')
  }

  render() {
    return (
      <>
        <div className="results-body">
          <h1>Here's what we found...</h1>
          {this.props.searchResult.map((retailer) => {
            return (
              <Panel className="search-results">
                <p><b>Name:</b> {retailer.name}</p>
                <p><b>Website:</b></p> <a href={retailer.website}>Click to Shop</a> 
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
          <Panel className="link-suggestions">
          <h2>Is there a retailer missing from this list?</h2><h2 onClick={this.handleGoToAdd}><b>Add to the collection.</b></h2>
          <h3>Didn't find what you needed?</h3><h3 onClick={this.handleGoToSearch}><b>Search again.</b></h3>
          <h3>See something that's not right?</h3><h3 onClick={this.handleGoToEdit}><b>Let us know</b></h3>
          </Panel>
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
  searchResult: reduxStore.searchResult.searchList
});

export default connect(mapStateToProps)(SearchResultPage);
