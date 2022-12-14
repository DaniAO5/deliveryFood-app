import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { actionRegisterAsync } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fileUpLoad } from "../services/fileUpLoad";
import './style.scss'


const passwordRegex =
  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

const schema = yup.object({
  name: yup.string().required("Por favor ingresar su nombre completo"),
  email: yup
    .string()
    .email("Debe ingresar un email")
    .required("Por favor ingresar su email"),
  password: yup
    .string()
    .required("Por favor ingresar contraseña")
    .matches(passwordRegex, {
      message:
        "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico",
    })
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .max(16, "La contraseña debe contener máximo 16 caracteres")
    .oneOf([yup.ref("repeatPassword")], "La contraseña ingresada no coincide"),
  repeatPassword: yup
    .string()
    .required("Por favor confirme la contraseña")
    .oneOf([yup.ref("password")], "La contraseña ingresada no coincide"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { error, errorMessage } = useSelector((store) => store.user);

  const onSubmit = async (data) => {
    const photoURL = await onUpLoadImage(data.photo[0]);
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: photoURL
    }
    dispatch(actionRegisterAsync(user));
    // if (error) {
    //   Swal.fire("Oops!", `Ha ocurrido un error: ${errorMessage}`, "error");
    // } else {
    //   Swal.fire("Good job!", "Tu cuenta se ha creado exitosamente!", "success");
    // }
  };

  const onUpLoadImage = async (image) => {
    const url = await fileUpLoad(image);
    if (url) {
      return url;
    } else {
      console.log("Ocurrió un error al cargar la imagen");
    }
  };

  return (
    <div className="p-5">
      <h1>Create Account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
        </FloatingLabel>
        <p>{errors.name?.message}</p>
        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...register("email")}
          />
        </FloatingLabel>
        <p>{errors.email?.message}</p>
        <FloatingLabel label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </FloatingLabel>
        <p>{errors.password?.message}</p>
        <FloatingLabel label="Confirme Password">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("repeatPassword")}
          />
        </FloatingLabel>
        <p>{errors.repeatPassword?.message}</p>
        <FloatingLabel label="Avatar" className="mb-3">
          <Form.Control type="file" {...register("photo")} size="sm" />
        </FloatingLabel>
        <Button variant="warning" type="submit" className="mb-3 ">
          Save
        </Button>
      </Form>
      <Link to="/">Back to Login</Link>
    </div>
  );
};

export default Register;
