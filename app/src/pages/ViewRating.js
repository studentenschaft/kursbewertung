import {React, Component} from 'react'
import StarRatingComponent from 'react-star-rating-component'
class ViewRating extends Component{
  render() {
    return(
      <div className="row">
        <div className="row">
          <StarRatingComponent />
        </div>
      </div>
    )
  }
}

export default ViewRating
