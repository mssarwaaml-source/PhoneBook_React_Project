import classes from "./addGroupForm.module.css";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddGroupForm({
  onClose,
  handleOverlayClick,
  setIsLoading,
  contacts,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    const options = contacts.map((contact) => ({
      value: contact.contact_id,
      label: `${contact.name} (${contact.phone})`,
    }));
    setOptions(options);
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function selectedContactsCheck() {
    if (selectedContacts.length === 0) {
      toast.error("Please select at least one contact", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  }

  function nameCheck() {
    if (name.length === 0) {
      toast.error("Please enter a name", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameCheck() || !selectedContactsCheck()) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("contacts", JSON.stringify(selectedContacts));

    axios
      .post("http://localhost:5000/app/groups/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success group added") {
          toast.success("Group added successfully", {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            onClose();
            setIsLoading(true);
          }, 1500);
        } else if (res.data.message === "existgroup") {
          toast.error("Group already exists", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Error adding group", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.popupContainer} onClick={handleOverlayClick}>
      <div className={classes.formBox}>
        <button
          className={classes.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2>Add Group</h2>

        <div
          className={classes.avatarUpload}
          onClick={handleAvatarClick}
          title="Add Image"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className={classes.imagePreview}
            />
          ) : (
            <div className={classes.avatarPlaceholder}>+</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        <Select
        classNamePrefix="react-select"
          className={classes.select}
          options={options}
          isMulti
          onChange={(selectedOptions) =>
            setSelectedContacts(selectedOptions.map((option) => option.value))
          }
        />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>
      </div>
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
