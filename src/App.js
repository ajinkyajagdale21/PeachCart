import './App.css';
import {NavBar} from './components/navBar';
import {Cart} from './components/Cart';
import {WishList} from './components/wishlist';
import {ProductListing} from './components/productlisting';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {ProductDetails} from './components/ProductDetails'
import {SignUp} from './components/signup'
import {Login} from './components/login'
import {PrivateRoute} from './util';
import {User} from './components/user';

function App() {
  return (
    <div className="App">
     
      <Router>
      <NavBar/>
      <Routes>
      <Route path="/"  element={<ProductListing/>}/>
      <PrivateRoute path="/cart"  element={<Cart/>} />
      <PrivateRoute path="/wishlist"  element={<WishList/>}/>
      <Route path="product/:productId" element={<ProductDetails/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/user" element={<User/>}/>

      </Routes>
      </Router>

    </div>
  );
}

export default App;
