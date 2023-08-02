import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector(state => state.alert);

  if (!alert.message) {
    return null;
  }

  const className = alert.success 
    ? 'alert--success' 
    : 'alert--error';

  return (
    <div className={`alert ${className}`}>
      <p className="alert__description">{ alert.message }</p>
    </div>
  );
}
 
export default Alert;