import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import characters from "./characters.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    characters,
    score: 0,
    currentGame: 1,
    highScore: 0
  };


  shuffle = () => {
    console.log("Shuffling...");
    const characters = this.state.characters;
    for (var i = 0; i < characters.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (characters.length - i));
      var temp = characters[j];
      characters[j] = characters[i];
      characters[i] = temp;
    }

    this.setState({ characters });
  };

  changeScore = () => {
    console.log("score :", this.state.score);
    this.setState({ score: this.state.score + 1 });
  };

  endGame = () => {
    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score});
    }
    this.setState({ score: 0 });
    this.setState({currentGame: this.state.currentGame + 1})  
    this.forceUpdate();
  }
  removeCharacters = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const character = this.state.character.filter(characters => characters.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ character });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Navbar 
        score={this.state.score}
        highScore={this.state.highScore}
        />

        <Header />
        
        {this.state.characters.map(characters => (
          <CharacterCard
            ref={instance => {this.CharacterCard = instance; }}
            endGame={this.endGame}
            changeScore={this.changeScore}
            score={this.state.score}
            shuffle={this.shuffle}
            currentGame={this.state.currentGame}
            removeCharacters={this.removeCharacters}
            id={characters.id}
            key={characters.id}
            name={characters.name}
            image={characters.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

