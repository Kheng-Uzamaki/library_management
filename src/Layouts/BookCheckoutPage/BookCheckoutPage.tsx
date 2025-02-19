import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../Utils/SpinnerLoading";
import StarReview from "../Utils/StarReview";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import LatestReview from "./LatestReview";

const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  //Revies State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const baseUrl = `http://localhost:8080/api/books/${bookId}?projection=bookProjection`;
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseJson = await response.json();

        // Corrected the way of mapping response to BookModel
        const loadedBook: BookModel = {
          id: responseJson.id,
          title: responseJson.title,
          author: responseJson.author,
          description: responseJson.description,
          copies: responseJson.copies,
          copiesAvailable: responseJson.copiesAvailable,
          category: responseJson.category,
          img: responseJson.img,
        };

        setBook(loadedBook);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

   useEffect(() => {
     const fetchBookReviews = async () => {
       try {
         const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

         const responseReviews = await fetch(reviewUrl);
         if (!responseReviews.ok) {
           throw new Error(`HTTP error! status: ${responseReviews.status}`);
         }

         const responseJsonReviews = await responseReviews.json();
         const responseData = responseJsonReviews._embedded.reviews || [];

         const loadedReviews: ReviewModel[] = [];
         let weightedStarReviews = 0;

         for (const review of responseData) {
           loadedReviews.push({
             id: review.id,
             userEmail: review.userEmail,
             date: review.date,
             rating: review.rating,
             book_id: review.bookId,
             reviewDescription: review.reviewDescription,
           });

           weightedStarReviews += review.rating;
         }

         if (loadedReviews.length > 0) {
           const averageRating = (
             weightedStarReviews / loadedReviews.length
           ).toFixed(1);
           setTotalStars(Number(averageRating));
         }

         setReviews(loadedReviews);
       } catch (error: any) {
         setHttpError(error.message);
       } finally {
         setIsLoadingReview(false);
       }
     };

     if (bookId) {
       fetchBookReviews();
     }
   }, [bookId]);

  if (isLoading || isLoadingReview) {
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
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead text-justify">{book?.description}</p>

              <StarReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
        <LatestReview reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarReview rating={totalStars} size={32} />
          </div>
          <CheckoutAndReviewBox book={book} mobile={true} />
        </div>
        <hr />
        <LatestReview reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};

export default BookCheckoutPage;
