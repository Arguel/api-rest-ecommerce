import './App.css';

import { Routes, Route } from 'react-router-dom';

// Components
import Layout from 'components/Layout/Layout';
// import RequireAuth "components/RequireAuth/RequireAuth"

// Pages
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Chat from './pages/Chat/Chat';
// import Cart from './pages/Cart/Cart';
// import SuccesfulOrder from './pages/SuccesfulOrder/SuccesfulOrder';
// import Orders from './pages/Orders/Orders';
// import Account from './pages/Account/Account';
// import Products from './pages/Products/Products';
import Shop from './pages/Shop/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* protected routes */}
        {/*<Route element={<RequireAuth />}>*/}
        <Route path="chat" element={<Chat />} />
        {/*   <Route path="userslist" element={<UsersList />} /> */}
        {/*</Route>*/}
      </Route>
      {/* <main className="app"> */}
      {/*   <Switch> */}
      {/*     <Route path="/login" component={Login} /> */}
      {/*     <Route path="/signup" component={Signup} /> */}
      {/*     <Route path="/chat"> */}
      {/*       {isLoggedIn ? <Chat /> : <Redirect to="/login" />} */}
      {/*     </Route> */}
      {/*     {/1* <Route path="/cart"> *1/} */}
      {/*     {/1*   {isLoggedIn ? <Cart /> : <Redirect to="/login" />} *1/} */}
      {/*     {/1* </Route> *1/} */}
      {/*     {/1* <Route path="/successful-order"> *1/} */}
      {/*     {/1*   {isLoggedIn ? <SuccesfulOrder /> : <Redirect to="/login" />} *1/} */}
      {/*     {/1* </Route> *1/} */}
      {/*     {/1* <Route path="/orders"> *1/} */}
      {/*     {/1*   {isLoggedIn ? <Orders /> : <Redirect to="/login" />} *1/} */}
      {/*     {/1* </Route> *1/} */}
      {/*     {/1* <Route path="/account"> *1/} */}
      {/*     {/1*   {isLoggedIn ? <Account /> : <Redirect to="/login" />} *1/} */}
      {/*     {/1* </Route> *1/} */}
      {/*     {/1* <Route path="/products/:id" component={Products} /> *1/} */}
      {/*     <Route path="/" component={Shop} /> */}
      {/*   </Switch> */}
      {/* </main> */}
    </Routes>
  );
}

export default App;
