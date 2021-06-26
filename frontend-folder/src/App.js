import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => {
  return (
      <Router>
        <div className="App">
            <Header />
            Hello
            <Footer />
        </div>
      </Router>
  );
}

export default App;
