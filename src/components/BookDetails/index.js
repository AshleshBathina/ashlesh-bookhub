import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noResult: 'NO_RESULT',
}

class BookDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, bookDetails: {}}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
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
        bookDetails: {
          id: data.book_details.id,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          aboutBook: data.book_details.about_book,
          title: data.book_details.title,
          readStatus: data.book_details.read_status,
          rating: data.book_details.rating,
          aboutAuthor: data.book_details.about_author,
        },
      }

      const {bookDetails} = formattedData

      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loadBookDetails = () => {
    const {apiStatus, bookDetails} = this.state

    const {
      id,
      authorName,
      coverPic,
      aboutBook,
      title,
      readStatus,
      rating,
      aboutAuthor,
    } = bookDetails

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            <div className="book-details-content">
              <div className="book-container1">
                <img className="book-cover-image1" src={coverPic} alt={title} />
                <div className="book-details1">
                  <h1 className="book-title1">{title}</h1>
                  <p className="book-author2">{authorName}</p>
                  <p className="book-rating1">
                    Avg Rating <BsFillStarFill color="#FBBF24" /> {rating}
                  </p>
                  <p className="book-status2">
                    Status: <span className="status">{readStatus}</span>
                  </p>
                </div>
              </div>

              <hr />

              <div className="abouts">
                <h1 className="about">About Author</h1>
                <p className="about-desc">{aboutAuthor}</p>
                <h1 className="about">About Book</h1>
                <p className="about-desc">{aboutBook}</p>
              </div>
            </div>

            <div className="foot-container">
              <Footer />
            </div>
          </>
        )
      case apiStatusConstants.failure:
        return (
          <div className="fail-container">
            <div className="failure-container">
              <img
                className="failure-img"
                src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1762103195/Group_7522_juuh24.png"
                alt="failure view"
              />
              <p className="failure-para">
                Something went wrong, Please try again.
              </p>
              <button className="failure-button" onClick={this.getBookDetails}>
                Try Again
              </button>
            </div>
          </div>
        )
      default:
        return (
          <div className="loader-container" testid="loader">
            <Loader type="Oval" color="#0284C7" height={50} width={50} />
          </div>
        )
    }
  }

  render() {
    return (
      <div className="book-details-container">
        <Header />
        {this.loadBookDetails()}
      </div>
    )
  }
}

export default BookDetails
