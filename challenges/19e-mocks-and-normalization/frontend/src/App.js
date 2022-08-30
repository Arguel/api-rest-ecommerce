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
// import HomeScreen from './pages/Home/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <main className="app">
        <Routes>
          <Route exact path="/chat" element={<Chat />} />
          {/* <Route exact path="/" component={HomeScreen} /> */}
          {/* <Route exact path="/product/:id" component={ProductScreen} /> */}
          {/* <Route exact path="/cart" component={CartScreen} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
