import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero'
import Team from './sections/Team'
import Navbar from './components/Navbar'
import ImageCarousel from './components/Carousel'
import About from './sections/About'
import Contact from './sections/Contacts'
import Footer from './sections/Footer'
import Merchandising from './pages/Merchandising';
import Events from './pages/Events';

// Create a Home component that contains all your main page sections
const Home = () => {
  return (
    <>
      <Hero />
      <ImageCarousel />
      <About />
      <Team />
      <Contact />
    </>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merchandising" element={<Merchandising />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App