import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
//import MUI CSS elements
import Panel from 'muicss/lib/react/panel';

class SearchResultPage extends Component {

  handleGoToAdd = () => {
    this.props.history.push('/add');
  }

  handleGoToSearch = () => {
    this.props.history.push('/search');
  }

  render() {
    console.log('search result is', this.props.searchResult);
    
    return (
      <>
        <h1>Here's what we found...</h1>
        {this.props.searchResult.map((item) => {
          return (
            <Panel>
              <p><b>Name:</b></p>
              <p><b>Website:</b></p>
              <p><b>Sizes Carried:</b></p>
              <p><b>Where You Can Shop:</b></p>
            </Panel>
          )
        })}
        <h2>Is there a retailer missing from this list?</h2><h2 onClick={this.handleGoToAdd}>Add to the collection.</h2>
        <h3>Didn't find what you needed?</h3><h3 onClick={this.handleGoToSearch}>Search again.</h3>
      </>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
  searchResult: reduxStore.searchResult.searchList
});

export default connect(mapStateToProps)(SearchResultPage);
