import './App.css';
import {NavBar} from './components/navBar';
import {Cart} from './components/Cart';
import {WishList} from './components/wishlist';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <Router>
      <NavBar/>
      <Switch>
      
      <Route path="/cart" exact component={Cart} />
      <Route path="/wishlist" exact component={WishList}/>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
