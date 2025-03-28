import Login from "./pages/Login.tsx";
import {Routes,Route} from "react-router-dom"
import NotFound from "./pages/NotFound.tsx";
import Users from "./pages/Users.tsx";
import {UsersProvider} from "./contexts/fetchUsersContext.tsx";


function App() {
    return (
        <main>
            <UsersProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/users" element={<Users/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </UsersProvider>

        </main>
    );
}

export default App;