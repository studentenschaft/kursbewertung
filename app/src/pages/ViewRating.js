import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'

class ViewRating extends Component {
  constructor() {
    super()

    this.state = {
      rating: 1
    }
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue })
  }

  render() {
    return (
      <div className="row">
        <div className="row col-6 quick-stats">
          <div className="col-4 star-label">Quality</div>
          <div className="col-8 stars text-left">
            <StarRatingComponent
              name="rate1"
              starCount={6}
              value={this.state.rating}
              onStarClick={this.onStarClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ViewRating
