import { ChangeEvent, useState } from "react"
import { IUser } from "../interfaces/IUser"
import { useNavigate } from "react-router-dom";

const initialUser = {
    id: 1,
    firstName: "",
    lastName: "",
    email: "",
    dateCreated: new Date(),
    isActive: true
}

export function NewUser(){

    const[user, setUser] = useState<IUser>(initialUser);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>){
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setUser({ ...user, [inputName]: inputValue})
    }

    return(
        <div>
            <h1>Users Management</h1>
        </div>
        
    )
}