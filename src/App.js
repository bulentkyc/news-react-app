import React from 'react';
import './App.css';

import NewsCard from './newsCard/newsCard';
import NavBar from './navBar/navBar'
import CartItem from './CartItem/CartItem'

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
          localStorage.setItem('data', result);
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
    let myCart=[...this.state.cart];
    
    if (itemIndex > -1) {
      myCart[itemIndex].amount += 1;
    }else{
      myCart.push({
        img:this.state.result[index].urlToImage, 
        title: this.state.result[index].title,
        amount: 1
      });
    }
    this.setState({
      cartCount: this.state.cartCount+1,
      cart: myCart
    },() => console.log(this.state.cart,itemIndex));
  }

  plusBtnClickHandler = (index) => {
    let myCart=[...this.state.cart];
    myCart[index].amount += 1;

    this.setState({
      cart: myCart,
      cartCount: this.state.cartCount+1
    });
  }

  minusBtnClickHandler = (index) => {
    let myCart=[...this.state.cart];
    myCart[index].amount -= 1;

    if ( myCart[index].amount===0) {
      myCart.splice(index,1);
    }

    this.setState({
      cart: myCart,
      cartCount: this.state.cartCount-1
    });
  }

  editCountOnInput = (event, index) => {
    let newAmount = parseInt(event.target.value);
    let myCart=[...this.state.cart];
    let oldAmount = myCart[index].amount;

    if (newAmount<=0) {
      myCart.splice(index,1);
    }else{
    
    myCart[index].amount = newAmount;

  }
  this.setState({
      cart: myCart,
      cartCount: parseInt(this.state.cartCount+(newAmount-oldAmount))
    });
  }

  render() {
    this.cartPlace=this.state.cart.map((item,i)=>{
      return <CartItem 
        img={item.img} 
        title={item.title} 
        amount={item.amount} 
        plusClick={()=>this.plusBtnClickHandler(i)}
        minusClick={()=>this.minusBtnClickHandler(i)}
        change={(e)=>this.editCountOnInput(e,i)}
      />
    });

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


          <div className="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalScrollableTitle">Total Amount {this.state.cartCount}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.cartPlace}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
