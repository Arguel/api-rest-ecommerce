import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
// import Navbar from './components/Navbar';

// Screens
import HomeScreen from './pages/Home/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
import Chat from './pages/Chat/Chat';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <main className="app">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/product/:id" component={ProductScreen} /> */}
          {/* <Route exact path="/cart" component={CartScreen} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
