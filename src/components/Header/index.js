import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {activeTab: '', navOptionsVisibility: false}

  componentDidMount() {
    const {location} = this.props

    if (location.pathname === '/') {
      this.setState({activeTab: 'home'})
    } else if (location.pathname === '/shelf') {
      this.setState({activeTab: 'shelf'})
    } else {
      this.setState({activeTab: 'none'})
    }
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  showNavOptions = () => {
    this.setState(prevState => ({
      navOptionsVisibility: !prevState.navOptionsVisibility,
    }))
  }

  render() {
    const {activeTab, navOptionsVisibility} = this.state
    return (
      <>
        <div className="header-container">
          <div className="header-content-container">
            <Link className="home-link" to="/">
              <img
                className="header-logo"
                src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1761976413/Group_7731_fzjv8e.png"
                alt="website logo"
              />
            </Link>
            <ul className="header-options-list">
              <li className="option-item">
                <Link
                  className={
                    activeTab === 'home' ? 'active option-item' : 'option-item'
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="option-item">
                <Link
                  className={
                    activeTab === 'shelf' ? 'active option-item' : 'option-item'
                  }
                  to="/shelf"
                >
                  Bookshelves
                </Link>
              </li>
              <li className="option-item">
                <button className="logout-button" onClick={this.onLogout}>
                  Logout
                </button>
              </li>
            </ul>
            <button className="ham-icon" onClick={this.showNavOptions}>
              <GiHamburgerMenu color="#475569" size={20} />
            </button>
          </div>
        </div>
        {navOptionsVisibility && (
          <div className="secondary-header-container">
            <ul className="secondary-header-options-list">
              <li className="option-item">
                <Link
                  className={
                    activeTab === 'home' ? 'active option-item' : 'option-item'
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="option-item">
                <Link
                  className={
                    activeTab === 'shelf' ? 'active option-item' : 'option-item'
                  }
                  to="/shelf"
                >
                  Bookshelves
                </Link>
              </li>
              <li className="option-item">
                <button className="logout-button" onClick={this.onLogout}>
                  Logout
                </button>
              </li>
              <li className="option-item">
                <button className="ham-icon" onClick={this.showNavOptions}>
                  <AiFillCloseCircle color="#334155" size={20} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
