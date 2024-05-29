import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [profileName, setProfileName] = useState("");
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    const newProfile = {
      id: Date.now(),
      name: profileName,
      image: "example.jpg",
    };

    const cachedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

    const updatedProfiles = [...cachedProfiles, newProfile];

    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    navigate("/profiles");
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 20) {
      setProfileName(e.target.value);
    }
  };

  return (
    <div>
      <h2>Criar Perfil</h2>
      <label htmlFor="profileName">Nome do Perfil:</label>
      <input
        type="text"
        id="profileName"
        value={profileName}
        onChange={handleChange}
        placeholder="Digite o nome do perfil"
      />
      <button onClick={handleCreateProfile} data-testid="create-profile-button">
        Criar Perfil
      </button>
    </div>
  );
}

export default CreateProfile;
