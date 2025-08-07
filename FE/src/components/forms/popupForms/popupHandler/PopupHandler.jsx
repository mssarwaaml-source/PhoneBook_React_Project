import React, { useEffect } from "react";
import AddContactForm from "../addContactForm/AddContactform";
import classes from "./popupHandler.module.css";
import ConfirmRemove from "../confirm-remove/ConfirmRemove";
import AddGroupForm from "../addGroupForm/AddGroupForm";
import EditForm from "../edit-form/EditForm";
import ShowGroup from "../../popupForms/showgroup/showGroup";
import AddContactToGroup from "../addContactToGroup/Add_Contact_To_Group";
export default function PopupHandler({
  onClose,
  form,
  setIsLoading,
  deleteContact,
  editContact,
  group_content,
  removefromGroup,
  handleGroupClick,
  addContactToGroup,
  contacts,
  deleteGroup,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  if (form === "add") {
    return (
      <AddContactForm
        onClose={onClose}
        handleOverlayClick={handleOverlayClick}
        setIsLoading={setIsLoading}
      />
    );
  }
  if (form === "remove") {
    return (
      <ConfirmRemove
        onClose={onClose}
        deleteContact={deleteContact}
        handleOverlayClick={handleOverlayClick}
      />
    );
  }
  if (form === "edit") {
    return (
      <EditForm
        onClose={onClose}
        editContact={editContact}
        setIsLoading={setIsLoading}
        handleOverlayClick={handleOverlayClick}
      />
    );
  }
  if (form === "show_group") {
    return (
      <ShowGroup
        onClose={onClose}
        handleOverlayClick={handleOverlayClick}
        group_content={group_content}
        removefromGroup={removefromGroup}
        handleGroupClick={handleGroupClick}
        deleteGroup={deleteGroup}
        setIsLoading={setIsLoading}
        contacts={contacts}
        addContactToGroup={addContactToGroup}
      />
    );
  }
  if (form === "addGroup") {
    return (
      <AddGroupForm onClose={onClose} handleOverlayClick={handleOverlayClick} setIsLoading={setIsLoading} contacts={contacts} />
    );
  }
  if (form === "addContactToGroup") {
    return (
      <AddContactToGroup onClose={onClose} handleOverlayClick={handleOverlayClick} group_content={group_content} contacts={contacts} addContactToGroup={addContactToGroup} />
    );
  }
}
