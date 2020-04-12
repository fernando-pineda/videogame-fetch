import React from 'react';
import './App.css';
import fetch from 'node-fetch';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      gameName: '',
      gameDate: '',
      gameId: '',
      background_image: '',
      rating: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { userInput } = data
    console.log(userInput)

    const fetchVideogame = (name) => {
      let query = 'https://api.rawg.io/api/games?search=' + name;

      return fetch(query)
        .then(response => {
          return response.json()
        })
        .catch(err => {
          console.log('Something went wrong!')
        })
    }

    fetchVideogame(userInput).then((result) => {
      let { name, released, background_image, rating, platforms } = result.results[0];
      console.log(platforms)
      this.setState({
        gameName: name,
        gameDate: released,
        image: background_image,
        rating: rating
      })
    })

  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const { gameName, gameDate, image, rating } = this.state;
    const url = "https://rawg.io/search?query=" + JSON.stringify(gameName);

    return (
      <>

        <div className="App-header">
          <h1>VIDEOGAME DATA SEARCH</h1>
          <form onSubmit={this.handleSubmit}>
            <p><input class="form-control col-form-label-sm" type="text" placeholder="Input your videogame name!" name='userInput' onChange={this.handleInputChange}></input></p>
            <p><button class="btn btn-primary btn-lg btn-block btn-sm" type="submit">SEARCH!</button></p>
          </form>
        </div>
        <div>
          <div className="content">
            <img src={image} className="img"></img>
            <p>Name: {gameName}</p>
            <p>Release date: {gameDate}</p>
            <p>Videogame rating: {rating}</p>
            <a class="btn btn-primary btn-lg btn-block btn-sm" href={url}>MORE INFO</a>
          </div>
        </div>

        <div className="App-footer">
          Fernando Pineda 2020
        </div>
      </>
    );
  }
}

export default App;
