import { collection, doc, updateDoc, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import { useAuthValue } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function UpdateProfile({ user, setUser }) {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();

  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const usersRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      const curUser = data.docs.find(
        (doc) => doc.data().email.toString().toLowerCase() === currentUser.email
      );
      setUser(curUser);
    };
    getUsers();
  }, [user, setUser, usersRef, currentUser]);

  const updateUser = async () => {
    const userDoc = doc(db, "users", user.id);
    await updateDoc(userDoc, {
      name: newName === "" ? user?.data()?.name : newName,
      birthday: newBirthday === "" ? user?.data()?.birthday : newBirthday,
      address: newAddress === "" ? user?.data()?.address : newAddress,
    })
      .then((doc) => console.log("success", doc))
      .catch((error) => console.error(error));
    navigate("/");
  };

  return (
    <div className="center">
      <div className="auth">
        <h3>UpdateProfile</h3>
        <div>
          <form name="update_form">
            <input
              type="name"
              value={newName}
              required
              placeholder={user?.data()?.name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="birthday"
              value={newBirthday}
              required
              placeholder={user?.data()?.birthday}
              onChange={(e) => setNewBirthday(e.target.value)}
            />

            <input
              type="address"
              value={newAddress}
              required
              placeholder={user?.data()?.address}
              onChange={(e) => setNewAddress(e.target.value)}
            />

            <button onClick={() => updateUser()}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
