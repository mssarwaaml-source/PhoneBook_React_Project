import classes from "./Contact.module.css";

export default function Contact({
  contact,
  setRemove,
  setShowRemove,
  openEditForm,
  getCommingSoon,
}) {
  const { contact_id, name, email, phone, image } = contact;

  return (
    <div className={classes.contact}>
      {image ? (
        <img
          src={`http://localhost:5000/images/${image}`}
          alt={name}
          className={classes.avatar}
        />
      ) : (
        <div
          className={classes.avatar}
          style={{ backgroundColor: "#" + contact.phone.substring(0, 6) }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <h1>{name}</h1>
      <p>{email}</p>
      <p>{phone}</p>
      <div className={classes.buttonContainer}>
        <button
          className={classes.deleteButton}
          onClick={() => {
            setShowRemove(true);
            setRemove([contact_id, image]);
          }}
        >
          Delete
        </button>
        <button
          className={classes.addToGroupButton}
          onClick={() => getCommingSoon()}
        >
          Add To Group
        </button>
        <button
          className={classes.editButton}
          onClick={() => openEditForm(contact_id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
