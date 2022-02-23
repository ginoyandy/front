import { object, string, ref } from 'yup';

export const createUserSchema = object({
  username: string()
    .required('El nombre de usuario es requerido. ')
    .min(8, 'El nombre de usuario es muy corto: mínimo 8 caracteres. ')
    .matches(
      /^[a-z0-9_.-]*$/,
      'El nombre de usuario solo puede contener letras minúsculas y números. ',
    ),
  password: string()
    .required('La contraseña es requerida. ')
    .min(8, 'La contraseña es demasiado corta: mínimo de 8 caracteres. '),
  passwordConfirm: string().oneOf(
    [ref('password'), null],
    'La contraseña y su confirmación deben de ser iguales. ',
  ),
  email: string()
    .email('El email debe ser un email válido. ')
    .required('El email es requerido. '),
});

export type UserRegister = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export const loginUserSchema = object({
  username: string().required('El nombre de usuario es requerido. '),
  password: string().required('La contraseña es requerida. '),
});

export type UserLogin = {
  username: string;
  password: string;
};
