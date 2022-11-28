import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionLoginAsync,
  actionLoginGoogleOrFacebook,
} from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { loginProvider } from "../services/dates";
import "./style.scss"

const schema = yup.object({
  email: yup
    .string()
    .email("Debe ingresar un email")
    .required("Por favor ingresar su email"),
  password: yup.string().required("Por favor ingresar contraseña"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { error, errorMessage } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(actionLoginAsync(data));
    if (error) {
      Swal.fire("Oops!", `Ha ocurrido un error: ${errorMessage}`, "error");
    } else {
      Swal.fire("Good job!", "Tu cuenta se ha creado exitosamente!", "success");
    }
  };

  const handleLoginGoogleOrFacebook = (provider) => {
    dispatch(actionLoginGoogleOrFacebook(provider));
  };

  return (
    <div className="p-5">
      <div className='container_logo'>
        <img src="./assets/Logofood.png" alt="logo" />
      </div>
      <h1>Sing in</h1>
      <h5>Login or create an account to start ordening</h5>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            autoComplete="off"
            placeholder="name@example.com"
            {...register("email")}
          />
        </FloatingLabel>
        <p>{errors.email?.message}</p>
        <FloatingLabel label="Password" >
          <Form.Control
            type="password"
            autoComplete="off"
            placeholder="Password"
            {...register("password")}
          />
        </FloatingLabel>
        <p>{errors.password?.message}</p>

        <Button variant="warning" type="submit" className="mt-3 mb-3">
          Login
        </Button>
      </Form>
      <Link to="/Register">Register</Link>
      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
         <p>Continue with</p>
        {loginProvider.map((provider, index) => (
          <img
            key={index}
            src={provider.image}
            alt={provider.name}
            style={{ width: "40px", cursor: "pointer" }}
            onClick={() => {
              handleLoginGoogleOrFacebook(provider.provider);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Login;
