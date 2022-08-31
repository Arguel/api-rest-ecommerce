import './App.css';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components

// Screens
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Chat from './pages/Chat/Chat';
// import Cart from './pages/Cart/Cart';
// import SuccesfulOrder from './pages/SuccesfulOrder/SuccesfulOrder';
// import Orders from './pages/Orders/Orders';
// import Account from './pages/Account/Account';
// import Products from './pages/Products/Products';
import Shop from './pages/Shop/Shop';

const isLoggedIn = true;

function App() {
  return (
    <Router>
      <main className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat">
            {isLoggedIn ? <Chat /> : <Redirect to="/login" />}
          </Route>
          {/* <Route path="/cart"> */}
          {/*   {isLoggedIn ? <Cart /> : <Redirect to="/login" />} */}
          {/* </Route> */}
          {/* <Route path="/successful-order"> */}
          {/*   {isLoggedIn ? <SuccesfulOrder /> : <Redirect to="/login" />} */}
          {/* </Route> */}
          {/* <Route path="/orders"> */}
          {/*   {isLoggedIn ? <Orders /> : <Redirect to="/login" />} */}
          {/* </Route> */}
          {/* <Route path="/account"> */}
          {/*   {isLoggedIn ? <Account /> : <Redirect to="/login" />} */}
          {/* </Route> */}
          {/* <Route path="/products/:id" component={Products} /> */}
          <Route path="/" component={Shop} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
