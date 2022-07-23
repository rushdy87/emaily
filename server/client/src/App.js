import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import Dashbord from "./components/dashbord/Dashbord";
import SurveyNew from "./components/surveys/SurveyNew";
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
          <Route path="/surveys/new" element={<SurveyNew />} />
          <Route path="/surveys" element={<Dashbord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
