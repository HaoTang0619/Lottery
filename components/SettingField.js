import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setDue } from "redux/allSlice";

export default function SettingField({ count, setCount }) {
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const handleSetTime = (e) => {
    const v = parseInt(e.target.value, 10);
    setTime(v >= 0 ? (v > 99 ? 99 : v) : "");
  };

  const getDue = (seconds) => {
    if (seconds <= 0) return null;
    const now = new Date();
    now.setTime(now.getTime() + seconds * 1000);
    return now;
  };

  const handleSetCount = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") return;

    const newDue = getDue(time * 60);
    axios.post("/api/setDue", { due: newDue });
    // undefined: Prevent generating a new winner when resetting time to 0
    dispatch(setDue(newDue ? String(newDue) : undefined));
    setCount(time * 60);
    setTime("");
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <FormControl
        variant="outlined"
        style={{ margin: "0 20px", width: "25ch" }}
      >
        <InputLabel htmlFor="minute-setting">抽獎時間</InputLabel>
        <OutlinedInput
          id="minute-setting"
          endAdornment={
            <InputAdornment style={{ marginLeft: "10px" }}>分鐘</InputAdornment>
          }
          labelWidth={65}
          onChange={handleSetTime}
          onKeyDown={handleSetCount}
          required
          type="number"
          value={time}
        />
      </FormControl>
      <Button
        color="primary"
        onClick={handleSetCount}
        style={{ background: count === 0 ? null : "#333" }}
        variant="contained"
      >
        {count === 0 ? "設定" : "重設"}
      </Button>
    </div>
  );
}
