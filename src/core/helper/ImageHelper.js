import React from 'react'

import { API } from '../../backend';

const ImageHelper = ({product}) => {

    const imageUrl = product? `${API}/product/photo/${product._id}`: "https://wallup.net/wp-content/uploads/2016/01/252608-nature-landscape-mountain-forest-mist-clouds-Alps.jpg";

  return (
    <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
  )
}

export default ImageHelper;