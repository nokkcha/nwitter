import { dbService, storageService } from "fbBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  //editing, setediting 은 현재 업데이트 상태인지 아닌지 알려줌
  const [editing, setEditing] = useState(false);
  //inputdp dlqfurehls text를 업데이트
  const [newNweet, setNewnweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure t o delete this nweet?");
    if (ok) {
      //delete
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      //reference에서 URL을 얻는 방법
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewnweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  onChange={onChange}
                  value={newNweet}
                  placeholder="What?!"
                  autoFocus
                  required
                  className="formInput"
                />
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {/* nweetObj안에 attachmentUrl 이 있다. */}
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <>
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
