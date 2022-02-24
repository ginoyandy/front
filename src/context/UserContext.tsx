import React, { useState } from 'react';
import { User } from '../interfaces/User';

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = React.createContext({} as UserContextType);

type props = {
  children: JSX.Element | JSX.Element[];
};

export function UserContextProvider({ children }: props) {
  const [user, setUser] = useState({} as User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
