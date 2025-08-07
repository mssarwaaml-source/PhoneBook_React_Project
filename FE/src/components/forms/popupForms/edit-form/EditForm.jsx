import React from "react";
import { useRef, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import classes from "./edit-form.module.css";

export default function EditForm({
  onClose,
  handleOverlayClick,
  setIsLoading,
  editContact
}) {
  const formRef = useRef();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

useEffect(() => {
  axios.get(`http://localhost:5000/app/Contacts/get/${editContact}`,{withCredentials:true})
  .then((res) => {
    setEmail(res.data.contact[0].email);
    setName(res.data.contact[0].name);
    setPhone(res.data.contact[0].phone);
    if(res.data.contact[0].image){
      setImagePreview(`http://localhost:5000/images/${res.data.contact[0].image}`);

    }
  })
  .catch((err) => {
    toast.error("Error fetching contact", {
      position: "top-center",
      autoClose: 3000,
    });
  });
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    axios
      .put(`http://localhost:5000/app/Contacts/update/${editContact}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success") {
          toast.success("Contact updated successfully", {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            onClose();
            setIsLoading(true);
          }, 1500);
        } else if (res.data.message === "existcontact") {
          toast.error("Contact already exists", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          console.log(res);
          toast.error("Error updating contact", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating contact", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

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

  function handlePhoneChange(e) {
    setPhone(e.target.value.replace(/[^0-9]/g, ""));
  }

  return (
    <div className={classes.popupContainer} onClick={handleOverlayClick}>
      <div className={classes.formBox} ref={formRef}>
        <button
          className={classes.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2>Add Contact</h2>

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

        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
          />

          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
