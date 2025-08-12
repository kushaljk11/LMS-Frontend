import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import Sidebar from './component/Sidebar';
import Dashboard from './component/admin/Dashboard';
import Books from './component/admin/Books'
import Members from './component/admin/Members';
import Borrow from './component/admin/Borrows';
import Setting from './component/admin/Setting';
import Landing from './component/admin/Landing';
import BorrowerDashboard from './component/borrower/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

