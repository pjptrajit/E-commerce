import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");
  const Navigate = useNavigate();

  const getProduct = async () => {
    let res = await fetch("http://localhost:9000/api/product/getAllProduct", {
      method: "GET",
    });
    res = await res.json();
    // console.log(res.productInfo);
    setProducts(res.productInfo);
  };

  const deleteProduct = async (id) => {
    let res = await fetch(
      `http://localhost:9000/api/product/deleteProduct/${id}`,
      {
        method: "DELETE",
      }
    );
    res = await res.json();
    // console.log(res);
    getProduct();
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (name.length <= 1) {
      setNameError("plz enter product name or more than 2 character ");
    } else if (price <= 0) {
      setNameError("");
      setPriceError("Plz enter valid price ");
    } else {
      setPriceError("");
      const formdata=new FormData();
      formdata.append("name",name)
      formdata.append("price",price)
      formdata.append("description",description)
      formdata.append("image",image)
      let res = await fetch("http://localhost:9000/api/product/createProduct", {
        method: "POST",
        body: formdata,
      });
      res = await res.json();
      // console.log(res);
      // console.log(res.productInfo);
      setName("");
      setDescription("");
      setPrice("");
      getProduct();
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

 

  return (
    <div>
      <div className="form">
        <form
          onSubmit={(e) => {
            createProduct(e);
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
                    setImage(e.target.files[0])
                }}
                id="image"
                className="border p-2 rounded-2xl outline-none w-72"
                type="file"
                placeholder="Select image.."
                accept="image/*"
              />
              {/* {priceError && (
                <p className="text-red-500 italic text-sm">{priceError}</p>
              )} */}
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
            Add Product
          </button>
        </form>
      </div>

      <div className="table_div  mb-20">
        <table className="border w-337.5  m-auto mt-10  rounded-2xl ">
          <thead>
            <tr className="border  bg-gray-600 text-white ">
              <th className="border p-4">SN.</th>
              <th className="border p-4">Image</th>
              <th className="border p-4">Description</th>
              <th className="border p-4">Name</th>
              <th className="border p-4">Price</th>
              <th className="border p-4">Action</th>
            </tr>
          </thead>
          {products?.length > 0 ? (
            <tbody>
              {products.map((item, index) => {
                return (
                  <tr
                    key={item._id}
                    className="border  hover:bg-gray-100 hover:text-black  bg-gray-200   "
                  >
                    <td className="border p-10"> {index + 1} </td>
                    <td className="border p-10"> <img src={`http://localhost:9000/image/${item.image}`} alt="image not found!" /> </td>
                    <td className="border p-10"> {item.description} </td>
                    <td className="border p-10">{item.name} </td>
                    <td className="border p-10">Rs.{item.price} </td>
                    <td className="flex gap-2 p-10">
                      <button
                        onClick={() => {
                          deleteProduct(item._id);
                        }}
                        className="border bg-red-500 text-white p-1 w-20"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          Navigate("/edit", { state: item });
                        }}
                        className="border p-1 w-20 bg-green-500 text-white  "
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default Product;

// Node js +database =react