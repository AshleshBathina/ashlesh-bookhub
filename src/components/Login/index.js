import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        jwtToken: data.jwt_token,
      }

      const {jwtToken} = formattedData

      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props

      history.replace('/')
    } else {
      const formattedData = {
        errorMsg: data.error_msg,
      }

      const {errorMsg} = formattedData

      this.setState({errorMsg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="page-container">
        <div className="content-container">
          <div className="left-container">
            <img
              className="login-cover-img"
              src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1761976266/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_ziuygc.jpg"
              alt="website login"
            />
          </div>
          <div className="right-container">
            <form className="login-card" onSubmit={this.onLogin}>
              <div className="login-card-img-container">
                <img
                  className="login-card-img"
                  src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1761976413/Group_7731_fzjv8e.png"
                  alt="login website logo"
                />
              </div>

              <div className="input-container">
                <label className="label" htmlFor="username">
                  Username*
                </label>
                <input
                  className="input"
                  id="username"
                  type="text"
                  onChange={this.onUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="password">
                  Password*
                </label>
                <input
                  className="input"
                  id="password"
                  type="password"
                  onChange={this.onPassword}
                  value={password}
                />
              </div>
              {errorMsg !== '' && <p className="login-error-msg">{errorMsg}</p>}
              <button className="login-button" type="submit">
                Login
              </button>
              <p className="idp">username: rahul <br/> password: rahul@2021</p>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
