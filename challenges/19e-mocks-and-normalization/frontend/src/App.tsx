import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

// Components
//import Layout from 'components/Layout/Layout';
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
import RequireAuth from 'components/RequireAuth/RequireAuth';
import { ERoles } from 'common/types/common.roles.enum';
//import PersistLogin from 'components/PersistLogin/PersistLogin';

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<PersistLogin />}>*/}
      {/* public routes */}
      <Route index element={<Shop />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={ERoles.FREE} />}>
        <Route path="chat" element={<Chat />} />
      </Route>

      {/* Catch all - replace with 404 component if you want */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/*</Route>*/}
    </Routes>
  );
}

export default App;
