import classes from "./add_contact_to_group.module.css";
import Select from "react-select";
import { useState, useEffect } from "react";
export default function Add_Contact_To_Group({
  onClose,
  handleOverlayClick,
  group_content,
  contacts,
  addContactToGroup,
}) {

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [options, setOptions] = useState([]);

function getContactsNotInGroup() {
  const groupContactIds = new Set(group_content.content_group.map((c) => c.contact_id));
  return contacts.filter((contact) => !groupContactIds.has(contact.contact_id));
}

  useEffect(() => {
    const addcontacttoGroupnew = getContactsNotInGroup();

    const options = addcontacttoGroupnew.map((contact) => ({
      value: contact.contact_id,
      label: `${contact.name} (${contact.phone})`,
    }));
    setOptions(options);
  }, []);


  return (
    <div className={classes.popupContainer} onClick={handleOverlayClick}>
      <button
        className={classes.closeButton}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className={classes.addContactToGroup}>
        <h1>Add Contact to Group</h1>
        <Select
          classNamePrefix="react-select"
          className={classes.select}
          options={options}
          isMulti
          onChange={(selectedOptions) =>
            setSelectedContacts(selectedOptions.map((option) => option.value))
          }
        />
        <button
          className={classes.addContactButton}
          onClick={() =>
            addContactToGroup(group_content.group_id, selectedContacts)
          }
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}
