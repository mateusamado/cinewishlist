import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
// import Login from "./views/Login";
// import Register from "./views/Register";
// import Profile from "./views/Profile";
// import Watchlist from "./views/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/login" element={Login} />
      <Route path="/register" element={Register} />
      <Route path="/profile" element={Profile} />
      <Route path="/watchlist" element={Watchlist} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
