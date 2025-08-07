import classes from "./GroupList.module.css";
import Group from "../group/Group";
import PopupHandler from "../../forms/popupForms/popupHandler/PopupHandler";


export default function GroupList({ groups, removefromGroup, setShowGroup, showGroup, group_content, setGroup_content, deleteGroup, contacts, addContactToGroup }) {


  function handleGroupClick(group_id) {
    const group = groups.find((group) => group.group_id === group_id);
    setGroup_content({
      group_id: group.group_id,
      group_name: group.group_name,
      content_group: group.contacts,
    });
    setShowGroup(true);
  }

  return (
    <div className={classes.groupList}>
      {groups.map((group) => (
        <Group
          key={group.group_id}
          group={group}
          onGroupClick={handleGroupClick}
        />
      ))}
      {showGroup && (
        <PopupHandler
          form="show_group"
          handleGroupClick={handleGroupClick}
          group_content={group_content}
          onClose={() => setShowGroup(false)}
          removefromGroup={removefromGroup}
          deleteGroup={deleteGroup}
          contacts={contacts}
          addContactToGroup={addContactToGroup}
        />
      )}
    </div>
  );
}
