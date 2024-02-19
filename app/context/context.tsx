// contexts/AppContext.ts
'use client'
import { createContext, useContext, ReactNode, useReducer, Dispatch, useEffect, useState } from 'react';
// Login Context
interface AppState {
  principalLogin: boolean;
  teacherLogin: boolean,
  studentLogin: boolean
}

type AppAction = { type: string};

interface AppContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const appReducer = (state:AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'PRINCIPAL_IN':
      return {...state, principalLogin:true}
    case 'TEACHER_IN':
      return {...state, teacherLogin:true}
    case 'STUDENT_IN':
      return {...state, studentLogin:true}
    case 'OUT':
      return {...state, principalLogin:false , teacherLogin:false, studentLogin:false}
    default:
      return state;
  }
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState:AppState = {
    principalLogin: false,
    teacherLogin: false,
    studentLogin: false
  } 
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const contextValue: AppContextProps = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// USER-DATA

interface UserContextProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
}

interface UserContextValue {
  user: User ;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User>({name:"",email:""});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};