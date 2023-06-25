// import Form from './Form/Form';
// import Filter from './Filter/Filter';
// import ContactList from './ContactList/ContactList';
// import { Route, Routes } from 'react-router-dom';
// import { Navigation } from './Navigation/Navigation';


// export const App =()=> {
//   return (<>
//      <div className='container'>
//     <Navigation />
//       <Routes>
//          <Route path='/' Component={ <div className="contacts">
//            <div className="App">
//         <h1>Phonebook</h1>
//         <Form  />
//         <h1>Contacts</h1>
//         <Filter  />
//         <ContactList />
//       </div>
//         </div>} />
//         <Route path='/register'>{ <div>Register</div>}</Route>
//         <Route path='/login'><div>Login</div></Route>
//           <Route path='/todos'><div>Todos</div></Route>
//      </Routes>
        
       
       

  

  
//       </div>
//   </>
   
        
       

//     );
// }

import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const TasksPage = lazy(() => import('../pages/Tasks'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectTo="/login" component={<TasksPage />} />
          }
        />
      </Route>
    </Routes>
  );
};
