import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import { reqAw } from './utils';
import _ from 'lodash';
import './autosuggestStyles.css';

class Search extends Component {
    state = {
        value: '',
        suggestions: []
    }

    componentDidMount() {
        this.fetchSearch = _.debounce(this.fetchSearch, 300);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.fetchSearch(value)
    };

    fetchSearch = async (term) => {
        var rs = await reqAw('/locations/v1/cities/autocomplete', `&q=${term}`)
        this.setState({ suggestions: rs })
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        this.props.onSearch(suggestion)
        // console.log(suggestion)
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Tìm kiếm ...',
            value,
            onChange: this.onChange,
            // onKeyUp: this.onKeyUp
        };
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={suggestion => suggestion.LocalizedName}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        )
    }
}

const renderSuggestion = (loc, { isHighlighted })  => (
    <Item isHighlighted={isHighlighted}>
      {loc.LocalizedName}, {loc.Country.LocalizedName}
    </Item>
  );
  
  const Item = styled.div`
    padding: 10px 20px;
    background-color: ${({ isHighlighted }) => isHighlighted && 'blue'};
    color: ${({ isHighlighted }) => isHighlighted && 'white'};
  `

export default Search;