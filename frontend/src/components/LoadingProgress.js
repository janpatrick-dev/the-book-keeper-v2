import HashLoader from "react-spinners/HashLoader";

const LoadingProgress = ({ message='' }) => {

  return (
    <div className="loading flex-center-c">
      <HashLoader color="black" />
      {message && <p>{ message }</p>}
    </div>
  )
}

export default LoadingProgress;