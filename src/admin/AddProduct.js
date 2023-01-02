import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {

    const {user, token} = isAuthenticated(); 

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories()
    .then((data) => {
        // console.log(data);
        if(data.error){
            setValues({...values, error: data.error});
        }else{
            setValues({...values, categories: data, formData: new FormData()});
            
        }
    })
  }

  useEffect(()=>{
    preload();
    return ()=>{
        // cleanup
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    createProduct(user._id, token, formData)
    .then((data) => {
        if(data.error){
            setValues({...values, error: data.error});
        }
        else{
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                category: "",
                loading: false,
                createdProduct:data.name 
            });
            setTimeout(() => {
                console.log("Timeout");
                setValues({...values, getRedirect: true});
            }, 2000);
        }
    })
  };

  const onRedirect = () => {
    if(getRedirect) {
        return <Redirect to="/admin/dashboard"/>
    }
  }

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0]: event.target.value;
    formData.set(name,value);
    setValues({...values, [name]: value});
  };



  const successMessage  = () => {
    return (
        <div className="alert alert-success mt-3"
        style={{display: createdProduct? "": "none"}}
        >
            <h4>{createdProduct} created successfully, Redirecting...</h4>
        </div>
    )
  }

  const errorMessage = () => {
    return (
        <div className="alert alert-danger mt-3"
        style={{display: error? "": "none"}}
        >
            <h4>An error has occured: {error}</h4>
        </div>
    )
  }
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success mb-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories && 
          categories.map((cate, index) => {
            return (<option key={index} value={cate._id}>{cate.name}</option>)
          })
          }
        </select>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product"
      description="Add a product to your shop"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {onRedirect()}
            {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
