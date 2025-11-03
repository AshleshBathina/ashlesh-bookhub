import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import {BsSearch, BsFillStarFill} from 'react-icons/bs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noResult: 'NO_RESULT',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    books: [],
    searchText: '',
    searchInput: '',
    bookshelfName: 'All',
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')

    const {searchText, bookshelfName} = this.state

    const value = bookshelvesList.find(shelf => shelf.label === bookshelfName)

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${
      value.value
    }&search=${encodeURIComponent(searchText)}`
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
          readStatus: book.read_status,
          rating: book.rating,
        })),
        total: data.total,
      }

      const {books, total} = formattedData

      if (total !== 0) {
        this.setState({
          books,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.noResult,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveTab = tab => {
    this.setState({bookshelfName: tab}, this.getBooks)
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.getBooks)
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  loadBooks = () => {
    const {apiStatus, books, searchText} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            <ul className="books-container">
              {books.map(book => (
                <li key={book.id} className="book-container">
                  <Link
                    className="book-content-container"
                    to={`books/${book.id}`}
                  >
                    <img
                      className="book-cover-image"
                      src={book.coverPic}
                      alt={book.title}
                    />
                    <div className="book-details">
                      <h1 className="book-title">{book.title}</h1>
                      <p className="book-author">{book.authorName}</p>
                      <p className="book-rating">
                        Avg Rating <BsFillStarFill color="#FBBF24" />{' '}
                        {book.rating}
                      </p>
                      <p className="book-status">
                        Status: <span>{book.readStatus}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="foot-container">
              <Footer />
            </div>
          </>
        )
      case apiStatusConstants.noResult:
        return (
          <div className="no-result-container">
            <img
              className="no-result-img"
              src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1762100357/Group_jtqucg.png"
              alt="no books"
            />
            <p className="no-result-para">
              Your search for {searchText} did not find any matches.
            </p>
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
            <button className="failure-button" onClick={this.getBooks}>
              Try Again
            </button>
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
    const {searchInput, bookshelfName} = this.state
    return (
      <div className="shelf-container">
        <Header />
        <div className="shelf-content-container">
          <div className="shelf-sidebar">
            <h1 className="sidebar-heading">Bookshelves</h1>
            <ul className="sidebar-options-list">
              {bookshelvesList.map(shelf => (
                <li className="sidebar-option-item" key={shelf.id}>
                  <button
                    className={
                      bookshelfName === shelf.label
                        ? 'sidebar-option active-shelf'
                        : 'sidebar-option'
                    }
                    onClick={() => this.changeActiveTab(shelf.label)}
                  >
                    {shelf.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="main-shelf-container">
            <div className="shelf-header">
              <h1 className="shelf-heading">{bookshelfName} Books</h1>
              <div className="search-container">
                <input
                  className="search-input"
                  onChange={this.onSearchInput}
                  value={searchInput}
                  placeholder="Search"
                  type="search"
                />
                <button
                  className="search-button"
                  onClick={this.onClickSearchButton}
                  testid="searchButton"
                  type="button"
                >
                  <BsSearch color="#94A3B8" size={15} />
                </button>
              </div>
              <div className="shelf-sidebar1">
                <h1 className="sidebar-heading">Bookshelves</h1>
                <ul className="sidebar-options-list">
                  {bookshelvesList.map(shelf => (
                    <li className="sidebar-option-item" key={shelf.id}>
                      <button
                        className={
                          bookshelfName === shelf.label
                            ? 'sidebar-option active-shelf'
                            : 'sidebar-option'
                        }
                        onClick={() => this.changeActiveTab(shelf.label)}
                      >
                        {shelf.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {this.loadBooks()}
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
