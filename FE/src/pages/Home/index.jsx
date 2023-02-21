import styles from "./home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function Home() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const token = localStorage.getItem("token");
    const users= {
    headers: {
    Authorization: `Bearer ${token}`,
    }};

    const next = () => {
        setPage(page + 1)
    };
    
    const back = () => {
        if (page === 0) {
          setPage(page = 1)
        }
        else {
           setPage(page - 1)
        }
    };

    useEffect(() => {
        axios
        .get(`http://localhost:3000/users?limit=3&page=${page}`, users)
        .then ((res) => {
          console.log("get data succes");
          console.log(res.data);
          res.data &&  setData(res.data.data);
        })
        .catch((err) => {
          console.log("get data fail");
          console.log(err);
        });
      }, [page])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1> Daftar Users </h1>
                    <div className={styles.baris}>
                    {data?.map((dat) => (
                        <div className={styles.card} key={dat.id}>
                            <h3> {dat.nama_depan} {dat.nama_belakang} </h3>
                            <p> Email: {dat.email}</p>
                            <p> HP: {dat.phone}</p>
                            <p> Alamat: {dat.alamat}</p>
                        </div>
                       ))} 
                    </div>
                    <div className={styles.pagination}>
                        <div className={styles.view}>
                            <p> Tampilkan </p>
                            <p className={styles.qty}> 3 </p>
                        </div>
                        <div className={styles.next}>
                            <Button title="back" className={styles.qty} onClick={back}/> 
                            <p> Page {page} </p>
                            <Button title="next" className={styles.qty} onClick={next}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}