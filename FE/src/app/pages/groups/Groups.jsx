import classes from "./groups.module.css";
import GroupList from "../../../components/contactComponents/groupList/GroupList";
import PopupHandler from "../../../components/forms/popupForms/popupHandler/PopupHandler";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGroup, setShowGroup] = useState(false);
  const [group_content, setGroup_content] = useState({
    group_name: null,
    content_group: [],
  });
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/app/groups", {
        withCredentials: true,
      })
      .then((res) => {
        setGroups(res.data.group_contact);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  function removefromGroup(group_id, contact_id) {
    axios
      .delete(`http://localhost:5000/app/groups/${group_id}/${contact_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success contact removed from group") {
          toast.success("Contact removed from group", {
            position: "top-center",
            autoClose: 3000,
          });
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        } else if (res.data.message === "Success group deleted") {
          toast.success("Group deleted", {
            position: "top-center",
            autoClose: 3000,
          });
          setShowGroup(false);
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        } else {
          toast.error("Error removing contact from group", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Error removing contact from group", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }

  function deleteGroup(group_id) {
    axios
      .delete(`http://localhost:5000/app/groups/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success group deleted") {
          setShowGroup(false);
          setLoading(true);
          toast.success("Group deleted", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Error deleting group", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }

  function getContacts() {
    axios
      .get("http://localhost:5000/app/contacts", {
        withCredentials: true,
      })
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addContactToGroup(group_id, contact_ids) {
    axios
      .post(`http://localhost:5000/app/groups/addcontact`, {
        withCredentials: true,
        group_id: group_id,
        contact_ids: contact_ids,
      })
      .then((res) => {
        if (res.data.message === "Success contact added to group") {
          setShowGroup(false);
          toast.success("Contact added to group", {
            position: "top-center",
            autoClose: 3000,
          });
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        } else {
          toast.error("Error adding contact to group", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Error adding contact to group", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }

  return (
    <div className={classes.groups}>
      {loading ? (
        <div className={classes.loading}>
          <Commet color="red" size="large" text="" textColor="#ffffff" />
        </div>
      ) : (
        <GroupList
          groups={groups}
          removefromGroup={removefromGroup}
          setShowGroup={setShowGroup}
          showGroup={showGroup}
          group_content={group_content}
          setGroup_content={setGroup_content}
          deleteGroup={deleteGroup}
          contacts={contacts}
          addContactToGroup={addContactToGroup}
        />
      )}
      {showAddGroup && (
        <PopupHandler
          setIsLoading={setLoading}
          onClose={() => setShowAddGroup(false)}
          form={"addGroup"}
          contacts={contacts}
        />
      )}
      <div className={classes.addGroup}>
        <button title="Add Group" onClick={() => setShowAddGroup(true)}>
          +
        </button>
      </div>
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
