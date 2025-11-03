import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {

  return (
    <div className="not-found-container">
      <img
        className="not-found-img"
        src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1762101142/Group_7484_ask1dh.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="not-found-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
