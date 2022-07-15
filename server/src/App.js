import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import { fetchUser } from "./store/auth/authAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/survey" element={<h2>SurveyNew</h2>} />
          <Route path="/surveys" element={<h2>Dashbord</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
