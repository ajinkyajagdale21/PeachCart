import './App.css';
import {NavBar} from './components/navBar';
import {Cart} from './components/Cart';
import {WishList} from './components/wishlist';
import {ProductListing} from './components/productlisting';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {ProductDetails} from './components/ProductDetails'
import {SignUp} from './components/signup'
import {Login} from './components/login'

function App() {
  return (
    <div className="App">
     
      <Router>
      <NavBar/>
      <Routes>
      <Route path="/"  element={<ProductListing/>}/>
      <Route path="/cart"  element={<Cart/>} />
      <Route path="/wishlist"  element={<WishList/>}/>
      <Route path="product/:productId" element={<ProductDetails/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path="/login" element={<Login/>}/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
