import { useState, useEffect, useContext } from "react";
import classes from "./StartingPageContent.module.css";
import axios from "axios";
import { AuthContext } from "../../store/AuthContext"

const StartingPageContent = () => {
  let {showData,setShowData} = useContext(AuthContext)
  const initialState = {
    title: "",
    img: "",
    description: "",
  };

  const [product, setProduct] = useState(initialState);
 
 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailId = localStorage.getItem("email").replace(/[@.]/g,"_")
    let token = localStorage.getItem('token')
    console.log("mail", emailId)
    console.log("token",token)
    try {
      let post = await axios.post(
        `https://crudcrud.com/api/7b295782952646a7a42f65e5e639e51c/${emailId}`,
        product
      );
      console.log(post.data);
      setShowData((prev) => [...prev, post.data]); 
      setProduct(initialState);
    } catch (error) {
      console.log("Error while posting data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={classes.starting}>
      <h1>Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          required
          name="title"
          onChange={handleChange}
          value={product.title}
          placeholder="Title"
        />

        <label htmlFor="img">Image URL</label>
        <input
          type="text"
          name="img"
          required
          onChange={handleChange}
          value={product.img}
          placeholder="Image URL"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          required
          onChange={handleChange}
          value={product.description}
          placeholder="Description"
        />

        <button type="submit">Add Product</button>
      </form>

     
      {showData.length > 0 &&
        showData.map((item, index) => (
          <div key={item._id || index} style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
            <h2>{item.title}</h2>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "150px", height: "auto" }}
            />
            <p>{item.description}</p>
          </div>
        ))}
    </section>
  );
};

export default StartingPageContent;

