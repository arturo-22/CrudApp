import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { useNavigate, useParams } from "react-router-dom";
import { appsetings } from "../settings/settings";
import Swal from "sweetalert2";
import '../styles/UpdateUser.css'

const initialUser = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  dateCreated: new Date(),
  isActive: true,
};

export function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const [ user, setUser ] = useState<IUser>(initialUser);
  const navigate = useNavigate();

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setUser({ ...user, [inputName]: inputValue})
}


const save = async() => {
    const response = await fetch(`${appsetings.apiUrl}User/Update`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if(response.ok) {
        navigate("/")
    }
    else{
      Swal.fire({
          title: "Error!",
          text: "No se pudo editar el usuario",
          icon: "warning"
        });
  }
}

const returnHomePage = () =>{
    navigate("/")
}

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${appsetings.apiUrl}User/Get/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }
    getUser()
  }, []);

  return(
    <div className="containerUpdate">
      <h1>Update User</h1>

      <form className="formUpdate">
        <div>
          <label htmlFor="firstName">Nombre:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={inputChangeValue}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={inputChangeValue}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputChangeValue}
            required
          />
        </div>

        <div>
          <label htmlFor="isActive">¿Activo?</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={user.isActive}
            onChange={(e) => setUser({ ...user, isActive: e.target.checked })}
          />
        </div>

        <button onClick={save}>Guardar</button>
        <button onClick={returnHomePage}>Volver</button>
      </form>
    </div>
        
    )
}
