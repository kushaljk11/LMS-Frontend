import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/borrowers" element={<Borrowers />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
          <Route path="/borrower/browse-books" element={<BrowseBooks />} />
          <Route path="/borrower/loaned-books" element={<LoanedBooks />} />
          <Route path="/borrower/settings" element={<BorrowerProfile />} />
          <Route path="/borrower/history" element={<BorrowingHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

