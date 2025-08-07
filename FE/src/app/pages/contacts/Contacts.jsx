import { useState, useEffect } from "react";
import classes from "./contacts.module.css";
import ContactList from "../../../components/contactComponents/contactList/ContactList";
import PopupHandler from "../../../components/forms/popupForms/popupHandler/PopupHandler";
import axios from "axios";
import { Commet } from "react-loading-indicators";
import { ToastContainer, toast } from "react-toastify";
export default function Contacts() {
  const [inputsearch, setInputsearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const [remove, setRemove] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editContact, setEditContact] = useState(null);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/app/contacts", { withCredentials: true })
      .then((res) => {
        setContacts(res.data.contacts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err:err");
        setIsLoading(false);
      });
  }, [isLoading]);

  function deleteContact() {
    const img = remove[1] ? remove[1] : "empty";
    axios
      .delete(
        `http://localhost:5000/app/Contacts/delete/${remove[0]}?image=${img}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === "Success") {
          toast.success("Contact deleted successfully", {
            position: "top-center",
            autoClose: 1000,
          });
          setIsLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openEditForm(contact_id) {
    setShowEditForm(true);
    setEditContact(contact_id);
  }

  function getCommingSoon() {
    toast.info("Comming Soon", {
      position: "top-center",
      autoClose: 1000,
    });
  }

  return (
    <div>
      <div className={classes.searchContainer}>
        <input
          className={classes.search}
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setInputsearch(e.target.value.toUpperCase());
          }}
        />
      </div>

      {/* Contacts list */}
      {isLoading ? (
        <div className={classes.loading}>
          <Commet color="red" size="large" text="" textColor="#ffffff" />
        </div>
      ) : (
        <div className={classes.contacts}>
          <ContactList
            inputsearch={inputsearch}
            contacts={contacts}
            setRemove={setRemove}
            setShowRemove={setShowRemove}
            openEditForm={openEditForm}
            getCommingSoon={getCommingSoon}
          />
        </div>
      )}

      {/* Add contact button */}
      <button
        className={classes.fab}
        title="Add Contact"
        onClick={() => setShowAddForm(true)}
      >
        +
      </button>

      {/* Add form popup */}
      {showAddForm && (
        <PopupHandler
          onClose={() => setShowAddForm(false)}
          form={"add"}
          setIsLoading={setIsLoading}
        />
      )}
      {showRemove && (
        <PopupHandler
          onClose={() => setShowRemove(false)}
          form={"remove"}
          deleteContact={deleteContact}
        />
      )}

      {showEditForm && (
        <PopupHandler
          onClose={() => setShowEditForm(false)}
          form={"edit"}
          editContact={editContact}
          setIsLoading={setIsLoading}
        />
      )}
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
