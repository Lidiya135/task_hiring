import React, {useState} from 'react';
import styles from "./register.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from '../../redux/action/register';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Register() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [nama_depan,setNamaDepan] = useState("");
    const [nama_belakang,setNamaBelakang] = useState("");
    const [alamat,setAlamat] = useState("");
    const [phone,setPhone] = useState("");

  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const postData = (e) =>{
      e.preventDefault();
      console.log(email);
      console.log(password);
      console.log(nama_depan);
      console.log(nama_belakang);
      console.log(alamat);
      console.log(phone);

      let data = {
        email,password,nama_depan,nama_belakang,alamat,phone
      }
      dispatch(registerUser(data,navigate))
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.baris}>
                        <Input label="Nama Depan" type="text" name="nama_depan" className="inputLogin" placeholder="First Name" value={nama_depan} onChange={(e)=>setNamaDepan(e.target.value)} />
                        <Input label="Nama Belakang" type="text" name="nama_belakang" className="inputLogin" placeholder="Last Name" value={nama_belakang} onChange={(e)=>setNamaBelakang(e.target.value)} />
                    </div>
                    <div className={styles.baris}>
                        <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <Input label="No. HP" type="number" name="phone" className="inputLogin" placeholder="No. HP" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <div>
                        <Input label="Alamat" type="text" name="alamat" className="alamat" placeholder="Alamat" value={alamat} onChange={(e)=>setAlamat(e.target.value)} />
                    </div>
                    <div className={styles.baris}>
                        <Input label="Password" type="password" name="password" className="inputLogin" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <Input label="Konfirmasi Password" type="password" name="password" className="inputLogin" placeholder="Konfirmasi Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <p>Do you have account? 
                        <Link to="/login">Login</Link>
                    </p>
                    <Button title="Register" btn="register" color="blue" type="" onClick={postData} />
                    
                </div>
            </div>
        </div>
    )
}
