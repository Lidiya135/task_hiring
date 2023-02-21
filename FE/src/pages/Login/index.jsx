import React from 'react';
import styles from "./login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from '../../redux/action/login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";
import gbr from "./log.jpg"

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email("Invalid email format").required("Required"),
        password: yup.string().min(4, "Minimum 4 character").required("Required"),
      }),
      onSubmit: (values) => {
        try {
          dispatch(loginUser(values, navigate));
        } catch (error) {
          swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#6a4029",
          });
        }
      },
    });

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.gambar}>
                        <img src={gbr} alt="" prop="" />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.login}>
                            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && (
                                <p>{formik.errors.email}</p>
                            )}
                            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && (
                                <p>{formik.errors.password}</p>
                            )}
                        <Button title="Login" btn="login" color="blue" />
                        <p>Don't have account? 
                            <Link to="/register">Register</Link>
                        </p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
