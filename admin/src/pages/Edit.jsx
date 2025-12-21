import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {

  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  // console.log(location.state.image);
  // const [products, setProducts] = useState([]); 
  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [description, setDescription] = useState(location.state.description);

  const [oldImage, setOldImage] = useState(location.state.image);
  const [newImage, setNewImage] = useState(null); 

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  console.log(oldImage)
  console.log(newImage)

  const updateProduct = async (e) => {
    e.preventDefault();
    if (name.length <= 1) {
      setNameError("plz enter product name or more than 2 character ");
    } else if (price <= 0) {
      setNameError("");
      setPriceError("Plz enter valid price ");
    } else {
      setPriceError("");
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("image", newImage);


      let res = await fetch(`http://localhost:9000/api/product/updateProduct/${location.state._id}`, {
        method: "PUT",
        body: formdata,
      });
      res = await res.json();
      // console.log(res);
      // console.log(res.productInfo);
      setName("");
      setDescription("");
      setPrice("");
      navigate('/product');
      
    }
  };

  return (
    <div>
      <div className="form">
        <form
          onSubmit={(e) => {
            updateProduct(e);
          }}
          className="w-125 flex flex-col items-center shadow-2xl rounded-2xl m-auto space-y-3  p-5 mt-10"
        >
          <div>
            <label htmlFor="name">
              Name:
              <br />
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border p-2 rounded-2xl outline-none w-72"
                type="text"
                placeholder="Name..."
                value={name}
              />
              {nameError && (
                <p className="text-red-500 italic text-sm">{nameError}</p>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="Price">
              Price:
              <br />
              <input
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="border p-2 rounded-2xl outline-none w-72"
                type="Number"
                placeholder="Price.."
                value={price}
              />
              {priceError && (
                <p className="text-red-500 italic text-sm">{priceError}</p>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="image">
              Image:
              <br />
              <input
                onChange={(e) => {
                  setNewImage(e.target.files[0])
                }}
                id="image"
                className="border p-2 rounded-2xl outline-none w-72"
                type="file"
                placeholder="Change Image."
                accept="image/*"
              />
              {priceError && (
                <p className="text-red-500 italic text-sm">{priceError}</p>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description:
              <br />
              <input
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                id="image"
                className="border p-2 rounded-2xl outline-none w-72"
                type="text"
                placeholder="description...."
                value={description}
              />
              {/* {priceError && (
                <p className="text-red-500 italic text-sm">{priceError}</p>
              )} */}
            </label>
          </div>

          <button className=" text-white w-72  bg-orange-400 p-3  rounded-2xl border">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default Edit