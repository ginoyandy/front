import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { User } from '../interfaces/User';
import { logInUser, saveToken, isLogged } from '../services/user.service';

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const loginUser = (logInData: { username: string; password: string }) => {
    logInUser(logInData)
      .then((res) => {
        const token = res.token;
        console.log(token);
        saveToken(token);
        setUser({ username: logInData.username, token});
      })
      .catch((err) =>
        toast({
          description:
            err instanceof Error ? err.message : 'Error al iniciar sesión',
          isClosable: true,
          status: 'error',
          title: 'Error',
        }),
      );
  };

  const logOutUser = (): void => {
    setUser({} as User);
    saveToken('');
  };

  const getToken = () => {
    return user?.token;
  };

  const isLogged = () :boolean => Boolean(user.token); // While usser not logged, token is empty string or undefined.

  return {
    user,
    setUser,
    loginUser,
    logOutUser,
    getToken,
    isLogged
  };
};
