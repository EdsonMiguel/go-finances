import React, {createContext, ReactNode, useContext} from 'react';


interface AuthProviderProps{
  children: ReactNode
}

interface User{
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextProps{
  user: User
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({children}: AuthProviderProps){
  const user = {
    id: '123',
    name: 'Edson Miguel',
    email: 'emigueltec@gmail.com'
  }

  return(
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}


function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}

