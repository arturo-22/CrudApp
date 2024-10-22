import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { appsetings } from "../settings/settings";
import Swal from "sweetalert2";
import '../styles/List.css'

export function List() {
  const [users, setUsers] = useState<IUser[]>([]);

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
        confirmButtonText: "Si, Eliminar!"
      }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch(`${appsetings.apiUrl}User/Delete/${id}`, {method: "DELETE"});
            if(response.ok) await getUsers()

        }
      });
  }

  useEffect(() => {
    getUsers()
  }, [])

  return(
    <div>
      <h1>List Users</h1>
      <hr />
      <a href={`/newUser`}>New User</a>
      <table>
        <thead>
            <tr>
                <th>firstName</th>
                <th>lastName</th>
                <th>email</th>
                <th>dateCreated</th>
                <th>isActive</th>
            </tr>
        </thead>
        <tbody>
            {
            
            users.map((item) => (
                <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    {/* <td>{item.dateCreated ? item.dateCreated.toLocaleDateString() : 'Fecha no disponible'}</td> */}
                    <td>{item.isActive}</td>
                    <td>
                        <a href={`/updateUser/${item.id}`}>Update User</a>
                        <button onClick={() => {deleteUser(item.id)}}>Delete User</button>
                    </td>
                </tr>
                ))

            }
        </tbody>
      </table>
      
    </div>
        
    )
}
