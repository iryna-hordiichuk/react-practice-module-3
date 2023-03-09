import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {

  state = {
    query: '',
  };

handleInput = (event) => {
const query = event.target.value;
this.setState({query: query});


}

handleSubmit = (event) => {
  event.preventDefault();
  this.props.handleForm(this.state.query);
  this.setState({query: ''});
}

  render() {
    return <>
<SearchFormStyled onSubmit={this.handleSubmit}>
  <InputSearch onChange={this.handleInput}/>
  <FormBtn>
    <FiSearch/>
  </FormBtn>
</SearchFormStyled>
    </>
  };
};
