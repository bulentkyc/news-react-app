import React from 'react';
import './App.css';

import NewsCard from './newsCard/newsCard'

class App extends React.Component {

state = {
  error: null,
  isLoaded: false,
  result: []
};

  componentDidMount() {
    fetch("https://newsapi.org/v2/top-headlines?country=de&apiKey=78961d7c864d4c77a95f173e437d7af1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result.articles
          });
          console.log(this.state.result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {this.state.result.map(item => {
            return(
              <NewsCard title={item.title} img={item.urlToImage}/>
            );
          })}
        </div>
      );
    }
  }
}

export default App;
