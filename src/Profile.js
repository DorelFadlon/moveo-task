import { useEffect } from "react";
import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase_config";
import {
  collection,
  getDocs,
  updateDoc,
  deleteField,
} from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();
  const usersRef = collection(db, "users");

  // const deleteUser = async () => {
  //   await updateDoc(user, {
  //     capital: deleteField(),
  //   })
  //     .then((doc) => {
  //       console.log("success", doc);
  //       navigate("/register");
  //     })
  //     .catch((error) => console.error(error));
  // };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      console.log(data._docs);
      const curUser = data._docs.find(
        (doc) => doc?.data()?.email?.toString().toLowerCase() === currentUser?.email
      );
      console.log(curUser);
      
      setUser(curUser);
    };
    getUsers();
  }, [user, setUser, usersRef, currentUser]);

  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <div>
            <p>
              <strong>Email:</strong>
              {user?.data()?.email}
            </p>
            <p>
              <strong>Name:</strong>
              {user?.data()?.name}
            </p>
            <p>
              <strong>Address:</strong>
              {user?.data()?.address}
            </p>
            <p>
              <strong>Birthday:</strong>
              {user?.data()?.birthday}
            </p>
            <button onClick={() => navigate("/updateProfile")}>
              Update User
            </button>
            <button > Delete User</button>
        </div>

        <span onClick={() => {signOut(auth);navigate("/login")}}>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
