import { useReducer, useEffect } from "react";
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import AppRoutes from "./routers/AppRoutes";

const init = () => JSON.parse(localStorage.getItem("user")) ||{logged: false}

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={ {user, dispatch} }>
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
