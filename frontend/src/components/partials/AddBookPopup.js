import BookAddForm from "../books/BookAddForm";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import UIHelper from "../../helpers/UIHelper";

const AddBookPopup = () => {
  const user = useSelector(state => state.user);

  const handleClickAction = (e) => {
    UIHelper.hideAddBookPopup();
  }

  return user && (
    <div className="add-book-popup hide">
      <div className="add-book-popup__container">
        <CloseIcon className='close-icon' onClick={handleClickAction} />
        <BookAddForm onSubmit={handleClickAction} />
      </div>
    </div>
  )
}

export default AddBookPopup;