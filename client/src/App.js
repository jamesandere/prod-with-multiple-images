import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  console.log(title);
  console.log(images);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", e.target.image.files[0]);
    submitToAPI(data);
  };

  const submitToAPI = async (data) => {
    const res = await axios.post(`http://localhost:5000/photos`, data);
    setImg(res.data.url);
    return res.data;
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((oldArray) => [...oldArray, files]);
  };

  const handleMultipleSubmit = (e) => {
    e.preventDefault();

    const data2 = new FormData();
    data2.append("title", title);
    images.map((image, i) => {
      console.log(image);
      data2.append("images[]", image[0]);
    });

    submitToAPI2(data2);
  };

  const submitToAPI2 = async (data) => {
    fetch(`${API_URL}/products`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {}, [img]);

  return (
    <div className="App">
      <h3>Single Image</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
      {img && <img className="image" src={img} alt="img" />}
      <h3>Multiple Images</h3>
      <form onSubmit={handleMultipleSubmit}>
        <label htmlFor="">Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleImages}
          multiple
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
