import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ListProfiles.css";

function ListProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const cachedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(cachedProfiles);
  }, []);

  return (
    <div>
      <h2>Meus Perfis</h2>
      {profiles.length === 0 ? (
        <p>Você ainda não tem nenhum perfil.</p>
      ) : (
        <div className="profiles-container">
          {profiles.map((profile) => (
            <Link key={profile.id} to="/home" className="profile-link">
              <div className="profile-card">
                <h3>{profile.name}</h3>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6hVW7gzDLT63TaHYALVKGoYMmjTh3xgu8hhC7WaXkw&s"
                  alt="Profile"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
      {profiles.length < 4 && (
        <Link to="/create-profile">
          <button>Criar Perfil</button>
        </Link>
      )}
    </div>
  );
}

export default ListProfiles;
