import { useState, useEffect } from "react";
import Contact from "../contact/Contact";
import classes from "./ContactList.module.css";

export default function ContactList({
  inputsearch,
  contacts,
  setRemove,
  setShowRemove,
  openEditForm,
  getCommingSoon,
}) {
  const [newcontacts, setNewcontacts] = useState([]);
  useEffect(() => {
    search();
  }, [inputsearch]);

  function search() {
    setNewcontacts(
      contacts.filter(
        (contact) =>
          contact.name.toUpperCase().startsWith(inputsearch) ||
          contact.phone.startsWith(inputsearch)
      )
    );
  }

  return (
    <div className={classes.contactList}>
      {newcontacts.map((contact) => (
        <Contact
          key={contact.contact_id}
          contact={contact}
          setRemove={setRemove}
          setShowRemove={setShowRemove}
          openEditForm={openEditForm}
          getCommingSoon={getCommingSoon}
        />
      ))}
    </div>
  );
}
