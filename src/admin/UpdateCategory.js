import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();


  const goBack = () => {
    return (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to='/admin/dashboard'>
                Go to Admin Home
            </Link>
        </div>
    )
  }

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  }

  const preLoad = (categoryId) => {
    getCategory(categoryId)
    .then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            setName(data.name)
        }
    })
  }

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request fired
    // we passed name as object, bc we are JSON.stringify it before sending to the server
    updateCategory(match.params.categoryId,user._id, token, {name}) 
    .then(data => {
        if(data.error){
            setError(true);
        }else{
            setError("");
            setSuccess(true);
            setName("");
        }
    })
  }


  const successMessage = () => {
    if(success){
        return <h4 className="text-success">Category created successfully</h4>
    }
  }

  const errorMessage = () => {
    if(error){
        return <h4 className="text-danger">Failed to create category</h4> 
    }
  }

  const myCategoryForm = () => (
    <form className="mb-4">
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input type="text" 
        className="form-control my-3"
        onChange={handleChange}
        value={name}
        autoFocus
        required
        placeholder="For ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-success rounded">Update category</button> 
      </div>
    </form>
  );
  

  return (
    <Base
      title="Create a category here"
      description="Add a new category for your clothes"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
        {myCategoryForm()}
        {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
