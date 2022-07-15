import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? "/surveys" : "/"} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
