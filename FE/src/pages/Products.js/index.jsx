import styles from "./product.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ModalEdit from "../../components/ModalEdit";
import swal from "sweetalert";

export default function Products() {

    const [data, setData] = useState([]);

    const getData =() =>{ 
        axios
        .get(`http://localhost:3007/product`)
        .then ((res) => {
          console.log("get data succes");
          console.log(res.data);
          res.data &&  setData(res.data.data);
        })
        .catch((err) => {
          console.log("get data fail");
          console.log(err);
        });
    }
        useEffect(() => {
            getData()
        }, [])

      const deleteData = (e, id) => {
        axios.delete(`http://localhost:3007/product/${id}`,)
        .then((res)=>{
            console.log("delete category success")
            console.log(res)
            swal.fire("Success", "Delete category success", "success");
            getData()
          })
          .catch((err)=>{
            console.log("delete category fail")
            console.log(err)
            swal.fire("Warning", "Delete categoryl failed", "error");
        })
      }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1> Daftar Products </h1>
                    <div className={styles.baris}>
                    {data?.map((dat) => (
                        <div className={styles.card} key={dat.id}>
                            <img src={dat.photo} prop="" alt="" />
                            <p> {dat.name}</p>
                            <span>Rp. {dat.price}</span>
                            <p> {dat.description}</p>
                            <div className={styles.btn}>
                                <ModalEdit id={dat.id} />
                                <Button title="Edit" btn="edit" color="blue" />
                                <Button type="submit" onClick={(e) => deleteData(e, dat.id)} title="Delete" btn="delete" color="red" />
                            </div>
                        </div>
                       ))} 
                    </div>
                </div>
            </div>
        </div>
    )
} 