import "../styles/List.css";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { appsetings } from "../settings/settings";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function List() {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await fetch(`${appsetings.apiUrl}User/List`);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const deleteUser = (id: number) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Eliminar Usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${appsetings.apiUrl}User/Delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) await getUsers();
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>List Users</h1>
      <a onClick={() => navigate("/newUser")}>New User</a>
      <table>
        <thead>
          <tr>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>isActive</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.isActive ? "Activo" : "Inactivo"}</td>
              <td>
                <a onClick={() => navigate(`/updateUser/${item.id}`)}>Update User</a>
                <button
                  className="btn-eliminar"
                  onClick={() => {
                    deleteUser(item.id);
                  }}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
