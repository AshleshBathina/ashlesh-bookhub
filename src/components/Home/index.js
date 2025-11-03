import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const formattedData = {
        books: data.books.map(book => ({
          id: book.id,
          authorName: book.author_name,
          coverPic: book.cover_pic,
          title: book.title,
        })),
        total: data.total,
      }

      const {books} = formattedData

      this.setState({
        topRatedBooks: books,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onFindBooks = () => {
    const {history} = this.props

    history.push('/shelf')
  }

  showHomeDetails = () => {
    const {apiStatus, topRatedBooks} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="slick-container">
            <Slider {...settings}>
              {topRatedBooks.map(book => (
                <Link
                  className="top-book-container"
                  to={`/books/${book.id}`}
                  key={book.id}
                >
                  <img
                    className="top-book-cover"
                    src={book.coverPic}
                    alt={book.title}
                  />
                  <h1 className="top-book-title">{book.title}</h1>
                  <p className="top-book-author">{book.authorName}</p>
                </Link>
              ))}
            </Slider>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="failure-container">
            <img
              className="failure-img"
              src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1762103195/Group_7522_juuh24.png"
              alt="failure view"
            />
            <p className="failure-para">
              Something went wrong, Please try again.
            </p>
            <button className="failure-button" onClick={this.getTopRatedBooks}>
              Try Again
            </button>
          </div>
        )
      default:
        return (
          <div className="loader-container1" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button className="find-books-button2" onClick={this.onFindBooks}>
            Find Books
          </button>
          <div className="top-rated-container">
            <div className="top-rated-books-header">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button className="find-books-button" onClick={this.onFindBooks}>
                Find Books
              </button>
            </div>
            {this.showHomeDetails()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
