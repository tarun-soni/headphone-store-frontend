import { Link } from 'react-router-dom'

const BackButton = ({ history }) => {
  return (
    <>
      <Link to={history.back()} className="btn btn-light my-3 ">
        <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
        Back
      </Link>
    </>
  )
}

export default BackButton
