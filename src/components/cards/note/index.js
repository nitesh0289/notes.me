import React, { useState } from "react";

import { formatDate } from "../../../utils/formatDate";
import utils from "../../../utils/localstorage";
import styles from "./note.module.scss";
import Button from "../../atoms/button";
import { toast } from "react-toastify";

function Note(props) {
  const { text, date, color } = props;
  const [expand, setExpand] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleSave = () => {
    const authToken = utils.getFromLocalStorage("auth_key");
    //Logic for create a note!
    if (!authToken) toast.error("User should be authenticated!");
    if (!noteText.length || noteText.split(" ").length < 2)
      toast.error("Note text should atleast contain 2 words!");
    fetch("http://localhost:3001/api/notes", {
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify({
        text: noteText,
        color,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data?.success === 200) {
          toast.success("Notes added successfully!");
        } else toast.error(data?.message);
      })
      .catch((error) => {
        console.log({ error });
        toast.error("Notes creation failed!");
      });
  };

  return (
    <article className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.content}>
        {!text.length ? (
          <textarea
            value={noteText}
            className={styles.textarea}
            onChange={(e) => setNoteText(e.target.value)}
          />
        ) : (
          <>
            <p className={expand ? styles.expanded : ""}>{text}</p>
            {text.length > 154 ? (
              <button onClick={() => setExpand((prev) => !prev)}>
                read {expand ? "less" : "more"}
              </button>
            ) : null}
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <div>{formatDate(date)}</div>
        {noteText.length ? (
          <Button text={"save"} className={styles.saveBtn} handleClick={handleSave} />
        ) : null}
      </footer>
    </article>
  );
}

export default Note;
