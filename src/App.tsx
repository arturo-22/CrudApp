import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./componets/List";
import { NewUser } from "./componets/NewUser";
import { UpdateUser } from "./componets/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/newUser" element={<NewUser/>}/>
        <Route path="/updateUser/:id" element={<UpdateUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
