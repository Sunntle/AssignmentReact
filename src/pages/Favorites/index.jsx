import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, PopoverBody, PopoverHeader, Table, UncontrolledPopover } from 'reactstrap';
import { showToast } from 'redux/toast/toastSlice';
import { removeItem } from 'redux/wishlist/wishlistSlice';

function FavoritesPage() {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("favoritesList")) || [])
    const dispatch = useDispatch()
    const handleRemoveItem = (el) =>{
        setWishlist(prev => {
            const  newWishlist = prev.filter(item => item.id !== el.id)
            localStorage.setItem("favoritesList", JSON.stringify(newWishlist))
            return newWishlist
        })
        dispatch(showToast({type: "success", message: "Removed from wishlist"}))
    } 

    const clearWishlist = useCallback(() =>{
      setWishlist([])
      dispatch(removeItem())
  },[dispatch])
    if (wishlist.length < 1)
    return (
      <Container className="cart py-5">
        <div className="my-5">
          <h1>
            <FontAwesomeIcon icon={faHeart} className="cartIconEmpty" />
          </h1>
          <h4 className="text-muted py-3">No items found in wishlist</h4>
          <Link to="/shop" color="dark" className="btn btn-dark text-uppercase py-2 px-4">
            Shop now
          </Link>
        </div>
      </Container>
    );
  return (
    <Container className="cart py-5">
    <div className="my-5">
      <h3>Your wishlist</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Add To Cart</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {wishlist.map((el, index) => {
            return (
              <tr key={index}>
                <td>
                  <img
                    className="img-fluid"
                    src={el.allImg?.split(";")[0]}
                    alt="img"
                  />
                </td>
                <td>
                  <div className="d-inline-block">
                    <Link
                      to="/"
                      className="text-decoration-none text-dark fw-bolder"
                    >
                      <h5>{el.name}</h5>
                    </Link>
                    {el.colorSelected && (
                      <p className="my-3 text-capitalize">
                        Color: {el.colorSelected}
                      </p>
                    )}
                    {el.sizeSelected && (
                      <p className="text-capitalize">Size: {el.sizeSelected}</p>
                    )}
                  </div>
                </td>
                <td className="price">
                  {el.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>
                  <Button
                    onClick={() => navigate(`/shop/${el.id}`)}
                    style={{backgroundColor: "#e53637", borderColor: "#e53637" ,outlineColor: "#e53637"}}
                    className="rounded-5 text-uppercase py-2 px-4"
                  >
                    Select option
                  </Button>
                </td>
                <td>
                  <Button
                    id={`PopoverFocus${index}`}
                    outline
                    color="transparent"
                  >
                    <FontAwesomeIcon icon={faClose} color="#e53637" />
                  </Button>
                  <UncontrolledPopover
                    placement="right"
                    target={`PopoverFocus${index}`}
                    trigger="focus"
                  >
                    <PopoverHeader style={{ fontSize: "0.85rem" }}>
                      Delete this item?
                    </PopoverHeader>
                    <PopoverBody className="p-2 d-flex align-items-center justify-content-between">
                      <Button
                        size="sm"
                        className="w-100"
                        onClick={() => handleRemoveItem(el)}
                        outline
                        color="danger"
                      >
                        Ok
                      </Button>
                      <Button size="sm" className="w-100" outline>
                        No
                      </Button>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-between">
        <Button onClick={()=>navigate("/shop")} color="dark" className="rounded-5 text-uppercase py-2 px-4">
          Continue shopping
        </Button>
        <Button color="dark" onClick={() => clearWishlist()} className="rounded-5 text-uppercase py-2 px-4">
          Clear Wishlist
        </Button>
      </div>
    </div>
  </Container>
  )
}

export default FavoritesPage