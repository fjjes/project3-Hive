import React from "react";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

const EditButton = ({ onEditClicked }) => {
  return (
    <button title="Edit" onClick={() => onEditClicked()}>
      <BsIcons.BsPencilSquare />
      &nbsp; Edit
    </button>
  );
};

const DeleteButton = ({ onDelete }) => {
  return (
    <button title="Delete" onClick={onDelete}>
      <RiIcons.RiDeleteBinFill />
      &nbsp; Delete
    </button>
  );
};

const SaveButton = ({ onSave }) => {
  return (
    <button title="Save" onClick={() => onSave()}>
      <GiIcons.GiSaveArrow />
      &nbsp; Save
    </button>
  );
};

const CancelButton = ({ onCancel }) => {
  return (
    <button title="Cancel" onClick={() => onCancel()}>
      <MdIcons.MdCancel />
      &nbsp; Cancel
    </button>
  );
};

const AddInputButton = ({ onAddInput }) => {
  return (
    <div className="edit-button">
      <button title="Add" onClick={() => onAddInput()}>
        <BsIcons.BsFillPlusCircleFill />
        &nbsp; Add Option
      </button>
    </div>
  );
};

export { EditButton, DeleteButton, SaveButton, CancelButton, AddInputButton };
