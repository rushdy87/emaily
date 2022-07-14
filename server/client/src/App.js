import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import { fetchUser } from "./store/auth/authAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="container">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<h2>landing</h2>} />
          <Route path="/survey" element={<h2>SurveyNew</h2>} />
          <Route path="/surveys/new" element={<h2>Dashbord</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
