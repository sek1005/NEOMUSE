import { useState, useEffect } from "react";

function GetUser() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const user = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            credentials: "include",
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setusers(data);
          // console.log(users);
        } else {
          console.error("Pas d'utilisateur trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    };
    user();
  }, []);

  return (
    <div className="delete_oeuvre">
      <p className="titreGestion">LISTE DES UTILISATEURS</p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Adress</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.users_id}>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.adress}</td>
              <td>{user.role}</td>
              <td>
                <button type="button" className="button_delete">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetUser;
