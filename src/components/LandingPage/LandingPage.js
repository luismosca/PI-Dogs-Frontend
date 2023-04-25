import { Link } from 'react-router-dom';
import '../LandingPage/LandingPage.css'
export default function LandingPage() {
  return (
    <div className="MyImage">
        <Link to="/home">
          <button className="myButton">Let's Go!!</button>
        </Link>
    </div>
  );
}
