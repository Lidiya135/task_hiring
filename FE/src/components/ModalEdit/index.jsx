// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function ModalEdit() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }





import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Input from "../Input";

function ModalEdit({id}) {
    console.log(id, "apakah ada")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [photo, setPhoto] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:3007/product/${id}`
          )
          .then((res) => {
            console.log("get data success");
            console.log(res.data);
            res.data && setData(res.data.data[0]);
          })
          .catch((err) => {
            console.log("get data fail");
            console.log(err);
          });
      }, []);

      const [updateData, setUpdateData] = useState({
        name: data.name,
        price: data.price,
        description: data.description
    })
    const handlePhoto = (e) => {
      setPhoto(e.target.files[0]);
      console.log(e.target.files[0]);
    };
    const handleChange = (e) => {
        setUpdateData({
          ...updateData,
          [e.target.name]:e.target.value
        })
    }
    const handleData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", updateData.name);
        formData.append("price", updateData.price);
        formData.append("description", updateData.description);
        formData.append("photo", photo);
        // console.log(formData)

      await axios
        .put(`http://localhost:3007/product/${id}`, formData)
        .then((res) => {
          console.log("Update product succes");
          console.log(res);
          window.location.reload(false);
          swal("Success", "Update product success", "success");
        })
        .catch((err) => {
          console.log("Update data product failed");
          console.log(err);
          swal("Warning", "Update product failed", "error");
        });
    };


    return(
        <div>
        <button
          className="btn mt-4"
          onClick={handleShow}
          style={{ borderColor: "#2395FF", color: "#2395FF", marginLeft: "85px" }}
        >
          Edit
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Photo Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="">
                <Input type="file" id="photo" name="photo" onChange={handlePhoto}/>
                <Input type="text" placeholder={data.name} name="name" value={updateData.name} onChange={(e) => handleChange(e)}/>
                <Input type="text" placeholder={data.price} name="price" value={updateData.price} onChange={(e) => handleChange(e)}/>
                <Input type="text" placeholder={data.description} name="description" value={updateData.description} onChange={(e) => handleChange(e)}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleData(e)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
}

export default ModalEdit