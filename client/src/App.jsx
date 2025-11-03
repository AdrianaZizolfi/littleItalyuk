import { useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './i18n'; // Import i18n configuration - make sure this path is correct

import Hero from './sections/Hero'
import Team from './sections/Team'
import Navbar from './components/Navbar'
import ImageCarousel from './components/Carousel'
import About from './sections/About'
import Contact from './sections/Contacts'
import Footer from './sections/Footer'
import Merchandising from './pages/Merchandising';
import Events from './pages/Events';
import SanGennaro from './pages/SanGennaro';
import AdminDashboard from './pages/AdminDashboard';
import Login from "./pages/Login";
import FashionShow from './pages/FashionShow';
import ComingSoon from './components/ComingSoon';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
};

// Create a Home component that contains all your main page sections
const Home = () => {
  return (
    <>
      {/* <Hero />
      <ImageCarousel />
      <About />
      <Team />
      <Contact /> */}
      <ComingSoon />
    </>
  );
};

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merchandising" element={<Merchandising />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sangennaro" element={<SanGennaro />} />
          <Route path="/fashion" element={<FashionShow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </Suspense>
  )
}

export default App