import React from 'react';
import './App.css';

import NewsCard from './newsCard/newsCard';
import NavBar from './navBar/navBar'

class App extends React.Component {

state = {
  error: null,
  isLoaded: false,
  result: [],
  cartCount: 0,
  cart: []
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

  addToCart = (index,title) =>{

    const itemIndex = this.state.cart.findIndex(item => {
      return item.title === title;
    });
    let cart=[...this.state.cart];
    
    if (itemIndex >= 0) {
      cart[itemIndex].amount += 1;
    }else{
      cart.push({
        img:this.state.result[index].urlToImage, 
        title: this.state.result[index].title,
        amount: 0
      });
    }
    
    
    this.setState({
      cartCount: this.state.cartCount+1,
      cart: cart
    });

    console.log(this.state.cart);
  }
  render() {
    let marketPlace;
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      this.marketPlace=this.state.result.map((item,index) => {
            return <NewsCard 
            title={item.title} 
            img={item.urlToImage} 
            click={()=>this.addToCart(index, item.title)}/>
          });
    }
    return(
      <div>
        <NavBar cartCount={(this.state.cartCount === 0)?'':this.state.cartCount}/>
        <br/>
        <div className="container mt-5">
          {this.marketPlace}
        </div>
      </div>
    );
  }
}

export default App;
