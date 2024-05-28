import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [profileName, setProfileName] = useState("");
  const history = useNavigate();

  const handleCreateProfile = () => {
    const newProfile = {
      id: Date.now(),
      name: profileName,
      image: "example.jpg",
    };

    const cachedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

    const updatedProfiles = [...cachedProfiles, newProfile];

    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    history("/profiles");
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 20) {
      setProfileName(e.target.value);
    }
  };

  return (
    <div>
      <h2>Criar Perfil</h2>
      <label>Nome do Perfil:</label>
      <input
        type="text"
        value={profileName}
        onChange={handleChange}
        placeholder="Digite o nome do perfil"
      />
      <button onClick={handleCreateProfile}>Criar Perfil</button>
    </div>
  );
}

export default CreateProfile;
