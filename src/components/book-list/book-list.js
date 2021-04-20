import React, { Component } from "react";
import { connect } from "react-redux";

import "./book-list.css";
import { compose } from "../../utils";
import { fetchBooks, bookAddedToCart } from "../../actions";
import withBookstoreService from "../hoc/with-bookstore-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import BookListItem from "../book-list-item";

const BookList = ({books, onAddedToCart}) => {
  return (
    <ul className={'book-list'}>
      {
        books.map(book => {
          const {id} = book;
          return (
            <li key={id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(id)}/>
            </li>
          );
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBooks();

    // const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
    // booksRequested();
    // bookstoreService.getBooks()
    //   .then(data => booksLoaded(data))
    //   .catch(error => booksError(error));
  }

  render() {
    const {books, loading, error, onAddedToCart} = this.props;

    if (error) {
      return <ErrorIndicator/>;
    }

    if (loading) {
      return <Spinner/>;
    }

    return <BookList
      books={books}
      onAddedToCart={onAddedToCart}/>;
  }
}

const mapStateToProps = ({bookList: {books, loading, error}}) => {
  return {
    books,
    loading,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {bookstoreService} = ownProps;
  return {
    fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
    // fetchBooks: fetchBooks(dispatch, bookstoreService),
    onAddedToCart: id => dispatch(bookAddedToCart(id))
  };
}

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };

export default compose(
  withBookstoreService,
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);