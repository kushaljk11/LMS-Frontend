import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
// import Sidebar from './component/Sidebar';
import Dashboard from './component/admin/Dashboard';
import Books from './component/admin/Books'
import Borrowers from './component/admin/Borrowers';
import Borrow from './component/admin/Borrows';
import Setting from './component/admin/Setting';
import Landing from './component/admin/Landing';
import BorrowerDashboard from './component/borrower/Dashboard';
import BrowseBooks from './component/borrower/Browsebook';
import LoanedBooks from './component/borrower/LoanBooks';
import BorrowerProfile from './component/borrower/Setting';
import BorrowingHistory from './component/borrower/BorrowerHistory';
import Signup from './pages/Signup';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          <Route path="/borrowers" element={<ProtectedRoute><Borrowers /></ProtectedRoute>} />
          <Route path="/borrow" element={<ProtectedRoute><Borrow /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
          <Route path="/borrower/browse-books" element={<BrowseBooks />} />
          <Route path="/borrower/loaned-books" element={<LoanedBooks />} />
          <Route path="/borrower/settings" element={<BorrowerProfile />} />
          <Route path="/borrower/history" element={<BorrowingHistory />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

