import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setDue, setWinner } from "redux/allSlice";

export default function Result({ user }) {
  const dispatch = useDispatch();
  const src = ["/boy.png", "/boy2.png", "/girl.png", "/girl2.png"];
  const color = ["turquoise", "deeppink"];

  const handleReset = () => {
    axios.post("/api/setDue", { due: null });
    axios.post("/api/setWinner", { winner: null });
    dispatch(setDue(null));
    dispatch(setWinner(null));
  };

  return user ? (
    <>
      <Card style={{ margin: "100px auto", minWidth: "500px", width: "60%" }}>
        <CardHeader title="抽獎結果" style={{ textAlign: "center" }} />
        <div
          style={{
            background: color[user.icon < 2 ? 0 : 1],
            padding: "20px 0",
          }}
        >
          <CardMedia
            image={src[user.icon]}
            style={{
              margin: "auto",
              paddingTop: "50%",
              width: "50%",
            }}
          />
        </div>
        <CardContent style={{ fontSize: "1.8em", textAlign: "center" }}>
          {user.name}
          <Button
            color="primary"
            onClick={handleReset}
            style={{ margin: "0 20px" }}
            variant="contained"
          >
            重新抽獎
          </Button>
        </CardContent>
      </Card>
    </>
  ) : (
    <></>
  );
}
