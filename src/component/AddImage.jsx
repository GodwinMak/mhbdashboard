import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { imageRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify"
import Picture from "../assets/images/profilePic.png"
import './addimage.css'


const AddImage = () => {

    const [values, setValues] = useState({
        description: ""
    })

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);

    const validateImg = (e) => {
        const file = e.target.files[0];
        if (file.size >= 7048576) {
            return alert("Max file size is 7mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "gmakyao");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/gmak/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }
    
    const handleSumbit = async (event)=>{
        event.preventDefault();
        const url = await uploadImage(image);

        const { description } = values;

        const {data} = await axios.post(imageRoute, {
            gallImg: url,
            description
        });
        if (data.status === false) {
            toast.error(data.msg, toastOptions)
        }
        else{
            window.location.reload(false);
        }
    }
    

  return (
    <>
          <Form onSubmit={(event) => handleSumbit(event)}>
            <Form.Group>
                <div className='contanierPreview'>
                      <img src={imagePreview || Picture} alt=''></img>
                </div>
                <Form.Label><strong>Add Image</strong></Form.Label>
                  <Form.Control type='file' onChange={validateImg} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><strong>Add Description</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} name='description' onChange={(event) => handleChange(event)}/>
            </Form.Group>
              <Button type="submit" >{uploadingImg ? "Uploading..." : "Upload"}</Button>
        </Form>
        <ToastContainer/>
    </>
  )
}

export default AddImage