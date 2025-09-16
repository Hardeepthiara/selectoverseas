import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminLeads from "./pages/AdminLeads";
export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLeads />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// import logo from './logo.svg';
// import './App.css';
// import Home from "./components/Home";
// import Services from "./components/Services";
// import ContactForm from "./components/ContactForm";
// import "./styles/global.css";

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <Home />
//         <Services />
//         <ContactForm />
//     </div>
//     </div>
//   );
// }

// export default App;
