import { Link } from "react-router-dom";

import SurvesList from "../surveys/surveys-list/SurvesList";

const Dashbord = () => {
  return (
    <div>
      <SurvesList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashbord;
