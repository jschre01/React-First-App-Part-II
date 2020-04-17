import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios';

class App extends Component {
  state = {
    characters : [],
  }
  render() {
    const { characters } = this.state

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
  removeCharacter = index => {
    var id;
    id = this.state.characters[index].id;
    axios.delete('http://localhost:5000/users/' + id)
    .then(function (response){
        console.log(response);
        return (response.status === 200);
    })
    .catch(function (error) {
        console.log(error);
    })

    const { characters } = this.state
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }
  handleSubmit = character => {
      this.makePostCall(character).then( callResult => {
         if(callResult.status === 201){
            this.setState({ characters: [...this.state.characters, callResult.data] });
    }
  })
 }
  makePostCall(character){
     return axios.post('http://localhost:5000/users', character)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
     axios.get('http://localhost:5000/users')
       .then(res => {
         const characters = res.data.users_list;
         this.setState({ characters });
       })
       .catch(function (error) {
         console.log(error);
       })
  }
}

export default App
