import React from 'react'
import { Link } from 'react-router-dom'
import { GoX } from 'react-icons/go'
import Fade from 'react-reveal/Fade'
import Amount from '../../components/order/amount'

function MyCart(props) {
  const { deleteCart, mycart } = props
  return (
    <>
      {mycart.map((value, index) => {
        return (
          <>
          <Fade bottom>
            <div key={value.productId} className="cartproductbox">
              <div className="productname">
                <GoX
                  className="mr-3 delete"
                  onClick={() => {
                    deleteCart(value.productId)
                  }}
                />
                <Link to={`/product/${value.productId}`}>
                  <img
                    className="productImg"
                    src={`http://localhost:5000/images/product/${value.productImg}`}
                  />
                </Link>
                <Link to={`/product/${value.productId}`}>
                  <p>{value.productName}</p>
                </Link>
              </div>
              <div className="productright">
                <div className="productdate">
                  <p>{value.date}</p>
                </div>
                <div className="productamount">
                  <Amount index={index} value={value.amount} />
                </div>
                <div className="productsubtotal">
                  <p>
                    NT$
                    {(value.productPrice * value.amount)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                  </p>
                </div>
              </div>
            </div>
            </Fade>
          </>
        )
      })}
    </>
  )
}

export default MyCart
