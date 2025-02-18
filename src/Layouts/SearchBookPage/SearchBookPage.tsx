import React, { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../Utils/SpinnerLoading";
import SearchBook from "./components/SearchBook";

const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl: string = "http://localhost:8080/api/books";
        const url: string = `${baseUrl}?page=0&size=5`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson = await response.json();
        const responseData = responseJson._embedded?.books;

        if (!responseData) {
          throw new Error("No books found");
        }

        const loadedBooks: BookModel[] = responseData.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          copies: book.copies,
          copiesAvailable: book.copiesAvailable,
          category: book.category,
          img: book.img,
        }));

        setBooks(loadedBooks);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>Error: {httpError}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control mr-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-success">Search</button>
              </div>
            </div>

            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Frontend
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Backend
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Number of results: (22)</h5>

          </div>
          <p>
            1 to 5 of 22 items
          </p>
          {books.map(book=>(
            <SearchBook book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBookPage;
