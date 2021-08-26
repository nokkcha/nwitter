import { dbService, storageService } from "fbBase";
import React, { useState } from "react";

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
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  onChange={onChange}
                  value={newNweet}
                  placeholder="What?!"
                  required
                />
                <input type="submit" value="Update!" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {/* nweetObj안에 attachmentUrl 이 있다. */}
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt={nweetObj.value}
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>delete Nweet</button>
              <button onClick={toggleEditing}>edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
