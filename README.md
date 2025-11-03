## 📚 BookHub

A fully functional **Book Hub** web application built using **React.js**.
This project demonstrates user authentication, routing, API integration, and responsive UI — all implemented with class-based components and lifecycle methods.

🔗 **Live Demo:** [ashleshbookhub.ccbp.tech](https://ashleshbookhub.ccbp.tech/)

---

### 🚀 Features

* **🔐 Authentication & Authorization**

  * Secure login using JWT tokens stored in cookies.
  * Protected routes for Home, Bookshelves, and Book Details.

* **🏠 Home Page**

  * Displays top-rated books from the API.
  * Interactive carousel using **React Slick**.
  * “Find Books” button navigates to the Bookshelves page.

* **📚 Bookshelves Page**

  * Dynamic filtering based on bookshelf category (`ALL`, `READ`, `CURRENTLY READING`, `WANT TO READ`).
  * Real-time search with API integration.
  * Loader and Failure View handled gracefully.
  * Empty results display a “No Books” view.

* **📖 Book Details Page**

  * Displays detailed book information (title, author, rating, about book, and author).
  * Fully responsive layout.
  * Handles failure state with retry mechanism.

* **⚙️ Routing**

  * Implemented using **react-router-dom**.
  * Includes Not Found route for invalid URLs.

* **🧭 Header & Footer**

  * Header navigation links with proper route handling.
  * Footer with social media icons (`FaGoogle`, `FaTwitter`, `FaInstagram`, `FaYoutube`).

* **📱 Responsive Design**

  * Optimized for **mobile**, **tablet**, and **desktop** views using CSS media queries.

---

### 🧩 Tech Stack

| Category     | Technologies                                          |
| ------------ | ----------------------------------------------------- |
| **Frontend** | React.js (Class Components), JSX, CSS                 |
| **Routing**  | React Router DOM                                      |
| **Auth**     | js-cookie                                             |
| **Icons**    | react-icons                                           |
| **Carousel** | react-slick                                           |
| **API**      | Fetch (REST API from [ccbp.in](https://apis.ccbp.in)) |

---

### 🔗 API Endpoints Used

| API                                                                | Method | Description                               |
| ------------------------------------------------------------------ | ------ | ----------------------------------------- |
| `https://apis.ccbp.in/login`                                       | POST   | Authenticates users and returns JWT token |
| `https://apis.ccbp.in/book-hub/top-rated-books`                    | GET    | Fetches top-rated books                   |
| `https://apis.ccbp.in/book-hub/books?shelf={shelf}&search={query}` | GET    | Fetches books by shelf & search filters   |
| `https://apis.ccbp.in/book-hub/books/{bookId}`                     | GET    | Fetches details for a single book         |

---

### 🔑 Test Credentials

Use any of the following credentials to log in:

```
username: rahul
password: rahul@2021
```

*Or choose another from the provided list in the project instructions.*

---

### 🧠 Key Concepts Demonstrated

* Class Component Lifecycle Methods (`componentDidMount`)
* State Management using `setState`
* Protected Routes and Redirection
* Fetching and Handling API Data
* Conditional Rendering (Loader, Failure, Empty States)
* Responsive Design via Media Queries
* Reusable Components (`Header`, `Footer`, `BookItem`, etc.)

---

### 🛠️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/book-hub.git
   cd book-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Visit:

   ```
   http://localhost:3000
   ```

---

### 🧾 Project Structure

```
src/
├── components/
│   ├── Login/
│   ├── Home/
│   ├── Bookshelves/
│   ├── BookDetails/
│   ├── NotFound/
│   ├── Header/
│   ├── Footer/
│   └── ...
├── App.js
├── index.js
└── index.css
```

---

### 🖥️ Screenshots

| Home                                                                   | Bookshelves                                                                          | Book Details                                                                           | Not Found                                                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Home](https://assets.ccbp.in/frontend/react-js/book-hub/home-sm.png) | ![Bookshelves](https://assets.ccbp.in/frontend/react-js/book-hub/bookshelves-sm.png) | ![Book Details](https://assets.ccbp.in/frontend/react-js/book-hub/book-details-sm.png) | ![Not Found](https://assets.ccbp.in/frontend/react-js/book-hub/not-found-sm.png) |

---

### 💡 Learnings

* Implementing **JWT-based authentication** in React.
* Efficiently managing **protected routes**.
* Integrating **API-driven UI updates** with class components.
* Ensuring **error handling** and **user experience** consistency.
* Building a **responsive SPA** from design specs (Figma).

---

### 👨‍💻 Author

**Ashlesh Bathina**
🎯 Aspiring Software Engineer
📧 [ashleshbathina@gmail.com]

