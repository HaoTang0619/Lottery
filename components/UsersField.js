import { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectAll, setUsers } from "redux/allSlice";

const src = ["/boy.png", "/boy2.png", "/girl.png", "/girl2.png"];
const color = ["turquoise", "deeppink"];

const AddModal = ({ open, onClose, snack }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectAll);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");
  const handleSetIcon = (e) => setIcon(e.target.value);
  const handleSetName = (e) => setName(e.target.value);

  const handleSubmit = () => {
    axios
      .post("/api/addUser", { icon, name })
      .then((res) => dispatch(setUsers([...users, res.data.newUser])));
    onClose();
    snack();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <FormControl component="fieldset" style={{ marginBottom: "35px" }}>
            <FormLabel component="legend" style={{ marginBottom: "15px" }}>
              Icon
            </FormLabel>
            <RadioGroup name="icon" onChange={handleSetIcon} row value={icon}>
              {src.map((s, idx) => (
                <FormControlLabel
                  key={s}
                  control={<Radio />}
                  label={
                    <Avatar
                      style={{
                        background: color[idx < 2 ? 0 : 1],
                        padding: "6px",
                      }}
                      src={s}
                    />
                  }
                  value={`${idx}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl
            component="fieldset"
            style={{ marginBottom: "35px", width: "100%" }}
          >
            <FormLabel component="legend" style={{ marginBottom: "15px" }}>
              Name
            </FormLabel>
            <TextField fullWidth onChange={handleSetName} value={name} />
          </FormControl>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={onClose} variant="contained">
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={icon === null || name.trim() === ""}
              onClick={handleSubmit}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

const UserRow = ({ user, idx, snack }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectAll);

  const handleDelete = () => {
    axios
      // eslint-disable-next-line dot-notation
      .post("/api/deleteUser", { _id: user["_id"] })
      .then(() => {
        const tmpUser = users.map((u) => u);
        tmpUser.splice(idx - 1, 1);
        dispatch(setUsers(tmpUser));
      })
      .finally(() => snack());
  };

  return (
    <ListItem>
      <ListItemAvatar
        style={{
          background: color[user.icon < 2 ? 0 : 1],
          padding: "4px 0",
          textAlign: "center",
        }}
      >
        <Avatar src={src[user.icon]} style={{ margin: "auto" }} />
      </ListItemAvatar>
      <ListItemText style={{ background: "#ddd", paddingLeft: "20px" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {`${idx}. ${user.name}`}
          {/* eslint-disable-next-line dot-notation */}
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItemText>
    </ListItem>
  );
};

export default function UsersField() {
  const { users } = useSelector(selectAll);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSetShow = () => setShow((s) => !s);
  const handleSetOpen = () => setOpen((o) => !o);

  return (
    <>
      <Card>
        <CardHeader
          title="參與抽獎名單"
          style={{ textAlign: "center" }}
          action={
            <IconButton onClick={handleSetShow}>
              <AddIcon color="primary" fontSize="inherit" />
            </IconButton>
          }
        />
        <Divider />
        <List style={{ height: "520px", minWidth: "375px", overflow: "auto" }}>
          {users !== undefined && users.length > 0 ? (
            users.map((user, idx) => (
              <UserRow
                // eslint-disable-next-line dot-notation
                key={user["_id"]}
                user={user}
                idx={idx + 1}
                snack={handleSetOpen}
              />
            ))
          ) : (
            <ListItem style={{ display: "block", textAlign: "center" }}>
              沒有參與者，將無法執行抽獎！
            </ListItem>
          )}
        </List>
      </Card>
      <AddModal open={show} onClose={handleSetShow} snack={handleSetOpen} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={open}
        onClose={handleSetOpen}
        message="Execute successfully!"
      />
    </>
  );
}
