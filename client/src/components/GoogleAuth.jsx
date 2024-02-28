import Button from "@mui/material/Button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signinFailer, signinSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: displayName, email, photoURL }),
      });
      const { data, status } = await res.json();
      if (status === "success") {
        dispatch(signinSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signinFailer(error.message));
    }
  };
  return (
    <Button
      variant="contained"
      className="!bg-red-700 w-[50%] !py-2 uppercase"
      type="button"
      onClick={handelClick}
    >
      continue with google
    </Button>
  );
}
