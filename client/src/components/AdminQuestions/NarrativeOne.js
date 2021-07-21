import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

function NarrativeOne(props) {
  const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null });

  const narrativeTextDefault =
    "Insert narrative text here... Lorem ipsum dolor sit amet consectetur, adipisicing elit. In autem laborum natus dicta amet quis quaerat a nobis aspernatur, ex commodi accusantium, assumenda sed optio possimus impedit quam quidem exercitationem neque cum corrupti maiores id. Modi, cum, similique temporibus dignissimos vero odit fuga, repellat obcaecati doloribus ullam cupiditate quaerat libero! Ea cum libero, nostrum iure ipsam praesentium itaque consequuntur nisi ipsum assumenda id enim magni reprehenderit fuga iste aliquam quas. Error libero consequuntur alias laboriosam.";

  const onEditClicked = (id, currentNarrative) => {
    setInEditMode({ status: true, key: id });
    // setNarrative(currentNarrative)
    console.log("clicked edit");
  };

  const handleDeleteClick = () => {
    console.log("clicked delete");
  };

  function handleNarrativeChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <div className="question-component admin-question-component narrative-component">
      <h2 style={{textAlign: "left"}}>Narrative</h2>
      <div className="narrative">
        <div className="narrative-text-area">
          {inEditMode.status ? (
            <textarea
              rows="10"
              cols="100"
              type="text"
              // value={props.value}
              defaultValue={narrativeTextDefault}
              onChange={handleNarrativeChange}
            >
            </textarea>
          ) : (
            <p>{narrativeTextDefault}</p>
          )}
        </div>
        <div className="narrative-buttons">
          <button
            className="clear icn3"
            title="Edit"
            onClick={() =>
              onEditClicked()
              // narrative
            }
          >
            <BsIcons.BsPencilSquare />
          </button>
          <span className="slash" style={{ color: "#fff" }}>
            /
          </span>
          <button
            className="clear icn4"
            title="Delete"
            onClick={() => {
              handleDeleteClick();
              // row._id
            }}
          >
            <RiIcons.RiDeleteBinFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NarrativeOne;
