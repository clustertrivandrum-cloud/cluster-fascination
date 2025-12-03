



import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Review.css';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios'



const dummyReviewsData = [
  { name: "Alice Johnson", rating: 5, review: "Absolutely love this! The quality is top-notch.", date: "2023-10-05" },
  { name: "Bob Smith", rating: 4, review: "Great value for money. Will buy again.", date: "2023-09-20" },
  { name: "Charlie Brown", rating: 5, review: "Exceeded my expectations. Fast delivery too!", date: "2023-10-12" },
  { name: "Diana Prince", rating: 3, review: "It's okay, but I expected a bit more based on the description.", date: "2023-08-15" },
  { name: "Ethan Hunt", rating: 5, review: "Perfect for my needs. Highly recommended.", date: "2023-11-01" },
  { name: "Fiona Gallagher", rating: 4, review: "Good product, sturdy and well-made.", date: "2023-09-28" },
  { name: "George Martin", rating: 2, review: "Not what I was looking for. Had to return it.", date: "2023-07-10" },
  { name: "Hannah Abbott", rating: 5, review: "Five stars! Amazing customer service.", date: "2023-10-22" }
];

const getRandomReviews = () => {
  const shuffled = [...dummyReviewsData].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * 4) + 2); // 2 to 5 reviews
  return selected.map((review, index) => ({ ...review, _id: `dummy-${index}`, id: `dummy-${index}` }));
};

function Review({ productId }) {
  const userDetails = useSelector((state) => state.userDetails);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    review: '',
  });
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [canWriteReview, setCanWriteReview] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/reviews/${productId}`);
        let fetchedReviews = response.data.data;
        if (!fetchedReviews || fetchedReviews.length === 0) {
          fetchedReviews = getRandomReviews();
        }
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(getRandomReviews());
      }
    };

    const checkCanWriteReview = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/orders/user/${userDetails._id}/product/${productId}`);
        setCanWriteReview(response.data.canWriteReview);
      } catch (error) {
        console.error('Error checking if user can write review:', error);
      }
    };

    fetchReviews();
    if (userDetails) {
      checkCanWriteReview();
    }
  }, [productId, userDetails]);

  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async () => {
    try {
      const response = await axiosInstance.post(`/api/v1/reviews`, {
        productId,
        userId: userDetails._id,
        ...newReview,
      }, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      });

      setReviews([...reviews, response.data.data]);
      setNewReview({ name: '', rating: 0, review: '' });
      handleCloseReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReadMore = () => {
    setShowAllReviews(true);
  };

  const totalReviews = reviews.length;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(1);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <div className="review-section">
      <h3 className="text-center">Customer Reviews</h3>
      <Row className="mb-4">
        <Col md={4}>
          <div className="rating-summary">
            <h5 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Ratings & Reviews</h5>
            <div className="text-center mb-3">
              <h1 className="display-4 fw-bold" style={{ color: 'var(--text-dark)' }}>{totalReviews > 0 ? averageRating : '0'}</h1>
              <div className="review-stars">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${index < Math.floor(averageRating) ? '' : 'text-muted'}`}
                    style={{ color: index < Math.floor(averageRating) ? 'var(--success-green)' : 'var(--text-muted)' }}
                  />
                ))}
              </div>
              <small className="text-muted">{totalReviews} ratings</small>
            </div>

            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="d-flex align-items-center mb-2">
                  <span className="text-muted me-2 d-flex" style={{ width: '30px' }}>
                    <span className="fw-bold">{rating}</span> <i className="fas fa-star ms-1" style={{ fontSize: '0.8rem', marginTop: '3px' }} />
                  </span>
                  <div className="progress-container flex-grow-1 mx-2">
                    <ProgressBar
                      now={(ratingCounts[rating - 1] / totalReviews) * 100}
                      variant="success"
                      className="progress-bar-custom"
                      style={{ height: '8px', backgroundColor: 'var(--light-mint)' }}
                    />
                  </div>
                  <span className="text-muted small" style={{ width: '35px', textAlign: 'right' }}>
                    {totalReviews > 0 ? `${((ratingCounts[rating - 1] / totalReviews) * 100).toFixed(0)}%` : '0%'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 w-100">
              <h5 className="fw-bold" style={{ fontFamily: 'var(--font-serif)' }}>Review this product</h5>
              <p className="text-muted small">Share your thoughts with other customers</p>
              <Button
                className="rounded-pill w-100 p-2 mt-2"
                onClick={handleOpenReviewModal}
                disabled={!canWriteReview}
                style={{
                  background: 'var(--primary-mint)',
                  border: 'none',
                  color: 'var(--text-dark)',
                  fontWeight: '600'
                }}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="reviews-list">
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Reviews from customers</h4>
            {displayedReviews.map((review) => (
              <div key={review._id || review.id} className="review-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '40px', height: '40px', background: 'var(--light-mint)', color: 'var(--success-green)', fontWeight: 'bold' }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="reviewer-name">{review.name}</div>
                      <div className="review-stars" style={{ fontSize: '0.9rem', marginBottom: '0' }}>
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${index < review.rating ? '' : 'text-muted'}`}
                            style={{ color: index < review.rating ? 'var(--accent-pink)' : '#e0e0e0' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                </div>
                <p className="review-text mt-2">{review.review}</p>
              </div>
            ))}
            {!showAllReviews && reviews.length > 4 && (
              <div className="text-center mt-4">
                <Button
                  variant="outline-success"
                  onClick={handleReadMore}
                  style={{ borderRadius: '20px' }}
                >
                  Read More Reviews
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleReviewChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReview" className="mt-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                value={newReview.review}
                onChange={handleReviewChange}
                rows={3}
                placeholder="Write your review"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Review;
