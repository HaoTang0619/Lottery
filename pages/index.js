import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Result from "@/Result";
import SettingField from "@/SettingField";
import Timer from "@/Timer";
import UsersField from "@/UsersField";
import useCounter from "hooks/useCounter";
import { connectToDatabase } from "util/mongodb";
import { fakeUsers } from "util/fakeData";
import { useDispatch, useSelector } from "react-redux";
import { selectAll, setUsers, setDue, setWinner } from "redux/allSlice";

export default function Index({
  users: initUsers,
  due: initDue,
  winner: initWinner,
}) {
  const dispatch = useDispatch();
  const { users, due, winner } = useSelector(selectAll);
  useEffect(() => {
    dispatch(setUsers(initUsers));
    dispatch(setDue(initDue ? String(initDue) : null));
    dispatch(setWinner(initWinner !== null ? initWinner : null));
  }, []);

  const diffSecond = () => {
    if (initDue === null) return 0;
    const now = new Date();
    const diff = (new Date(initDue).getTime() - now.getTime()) / 1000;
    return diff > 0 ? diff : 0;
  };
  const [count, setCount] = useCounter(diffSecond());
  const [page, setPage] = useState(null);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const getWinner = () => getRandomInt(users.length);

  useEffect(() => {
    // Waiting initialization
    if (users !== undefined && due !== undefined && winner !== undefined) {
      if (count === 0 && due !== null && users.length > 0) {
        if (winner === null) {
          const newWinner = initWinner || getWinner();
          axios.post("/api/setWinner", { winner: newWinner });
          dispatch(setWinner(newWinner));
        }
        setPage("result");
      } else setPage("index");
    }
  }, [count === 0, due, winner]);

  if (page) {
    return page === "index" ? (
      <Grid container style={{ padding: "50px 100px" }}>
        <Grid item md={6}>
          <SettingField count={count} setCount={setCount} />
          <br />
          <Timer count={count} />
        </Grid>
        <Grid item md={6}>
          <UsersField />
        </Grid>
      </Grid>
    ) : (
      <Result user={users[winner]} />
    );
  }
  return <></>;
}

export async function getServerSideProps() {
  const { client, db } = await connectToDatabase();

  let users = fakeUsers;
  let due = { 0: { due: null } };
  let winner = { 0: { winner: null } };
  const isConnected = await client.isConnected();

  if (isConnected) {
    users = await db.collection("user").find().toArray();
    due = await db.collection("due").find({ name: "due" }).toArray();
    winner = await db.collection("winner").find({ name: "winner" }).toArray();

    if (!due[0]) {
      due = [{ due: null }];
    }
    if (!winner[0]) {
      winner = [{ winner: null }];
    }
  }

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      due: JSON.parse(JSON.stringify(due))[0].due,
      winner: JSON.parse(JSON.stringify(winner))[0].winner,
    },
  };
}
