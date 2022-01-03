import "./Styles/DeleteModal.scss";

let DeleteModal = ({ setDeleting, deleteComment, setDeleteModalState }) => {
  let cancelDelete = () => {
    setDeleting(false);
    setDeleteModalState(false);
  };

  let deleteBtnClick = () => {
    deleteComment();
    setDeleteModalState(false);
  };

  return (
    <div className="delete-confirmation-wrapper">
      <div className="delete-container">
        <div className="title">Delete comment</div>
        <div className="confirmation-message">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className="btn-container">
          <button className="cancel-btn" onClick={cancelDelete}>
            No, cancel
          </button>
          <button className="delete-btn" onClick={deleteBtnClick}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
