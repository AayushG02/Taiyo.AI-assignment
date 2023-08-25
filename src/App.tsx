import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing all the pages
import Contact from "./pages/Contact";
import CreateContact from "./pages/CreateContact";
import ChartsMaps from "./pages/ChartsMaps";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";

import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <div className="App flex">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/createcontact" element={<CreateContact />} />
            <Route path="/chartsmaps" element={<ChartsMaps />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ContactProvider>
  );
}

export default App;
