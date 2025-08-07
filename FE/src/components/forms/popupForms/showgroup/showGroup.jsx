import classes from "./showgroup.module.css";
import PopupHandler from "../popupHandler/PopupHandler";
import { useEffect, useState } from "react";
export default function ShowGroup({
  onClose,
  handleOverlayClick,
  group_content,
  removefromGroup,
  handleGroupClick,
  deleteGroup,
  setIsLoading,
  contacts,
  addContactToGroup,
}) {
  const { group_id, group_name, content_group } = group_content;
  const [showAddContactToGroup, setShowAddContactToGroup] = useState(false);

  useEffect(() => {
    handleGroupClick(group_id);
  },[]);


  return (
    <div className={classes.showGroup} onClick={handleOverlayClick}>

      <div className={classes.showGroupContent}>
        <button className={classes.deleteGroupButton} onClick={() => deleteGroup(group_id)}>Delete Group</button>
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={classes.groupName}>{group_name}</h1>
        <ul className={classes.contactList}>
          {content_group.map((contact) => (
            <li key={contact.contact_id} className={classes.contactItem}>
              <span className={classes.contactName}>{contact.name}</span>
              <span className={classes.contactPhone}>{contact.phone}</span>
              <button
                className={classes.removeButton}
                onClick={() => removefromGroup(group_id, contact.contact_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button className={classes.addContactButton} onClick={() => setShowAddContactToGroup(true)}>Add Contact</button>
      </div>
      {showAddContactToGroup && (
        <PopupHandler form="addContactToGroup" onClose={() => setShowAddContactToGroup(false)} handleOverlayClick={handleOverlayClick} setIsLoading={setIsLoading} group_content={group_content} contacts={contacts} addContactToGroup={addContactToGroup} />
      )}
    </div>
  );
}
