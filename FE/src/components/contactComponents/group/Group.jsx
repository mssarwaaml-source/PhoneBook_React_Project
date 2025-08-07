import classes from "./group.module.css";
import dayjs from "dayjs";

export default function Group({ group, onGroupClick }) {

  const { group_id, group_name, group_image, createdAt, updatedAt, contacts } = group;

  return (
    <div className={classes.group} onClick={() => onGroupClick(group_id)}>
      {group_image ? (
        <img
          src={`http://localhost:5000/images/${group_image}`}
          alt={group_name}
          className={classes.groupImage}
        />
      ) : (
        <div
          className={classes.groupImage}
          style={{ backgroundColor: "#" + dayjs(createdAt).format("DDHHmm") }}
        >
          {group_name.charAt(0).toUpperCase()}
        </div>
      )}

      <h1 className={classes.groupName}>{group_name}</h1>
      <p className={classes.groupInfo}>
        <span>Members:</span> {contacts.length}
      </p>
      <p className={classes.groupInfo}>
        <span>Created at:</span> {dayjs(createdAt).format("DD/MM/YYYY - HH:mm")}
      </p>
      <p className={classes.groupInfo}>
        <span>Updated at:</span> {dayjs(updatedAt).format("DD/MM/YYYY - HH:mm")}
      </p>
    </div>
  );
}
