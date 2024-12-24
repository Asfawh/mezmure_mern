import { Navigate, Routes, Route } from 'react-router-dom';

import AccountBar from './components/AccountBar';

import AuthProvider from './context/AuthContext';
import AppBar from './components/AppBar';
import Main from './views/Main';
import Details from './views/Details';
import UpdateForm from './views/UpdateForm';
import MainList from './views/MainList';

function App() {
  return (
    <AuthProvider>
      <AppBar />
      <AccountBar /> 
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/songs" />} />
          <Route path="/songs" element={<MainList />} />
          <Route path="/songs/new" element={<Main />} />
          <Route path="/songs/:id" element={<Details />} />
          <Route path="/songs/:id/edit" element={<UpdateForm />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
