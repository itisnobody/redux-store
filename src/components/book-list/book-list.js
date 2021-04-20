import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

  componentDidMount() {
    this.props.fetchBooks();
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
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart
  }, dispatch);
}

export default compose(
  withBookstoreService,
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);