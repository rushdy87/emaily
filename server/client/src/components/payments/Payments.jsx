import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import { handleToken } from "../../store/auth/authAction";

const Payments = () => {
  const dispatch = useDispatch();
  return (
    <StripeCheckout
      name="Emaily" // the pop-in header title
      description="$5 for 5 email credits" // the pop-in header subtitle
      amount={500} // cents
      currency="USD"
      token={(token) => dispatch(handleToken(token))} //submit callback
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add credits</button>
    </StripeCheckout>
  );
};

export default Payments;
