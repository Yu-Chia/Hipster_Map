import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//取得購物車資料
import { getCartDataAsync, getCartData } from './actions/order/order_Actions'

import Mynavbar from './components/Mynavbar'
import Myfooter from './components/Myfooter'
import MainContent from './components/MainContent'
import NotFoundPage from './pages/NotFoundPage'

import Home from './pages/Home'
import About from './pages/About'
import Forgetpwd from './pages/Forgetpwd'

import Test from './pages/Test'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Map from './pages/Map'

import ShoppingCar from './pages/order/ShoppingCar'

import PaymentDetail from './pages/payment/paymentDetail'
import PaymentFinish from './pages/payment/paymentFinish'
import PaymentType from './pages/payment/paymentType'

//member
import MemberUser from './pages/members/MemberUser'

//blog
import Blog from './pages/blog/Blog'
import BlogEdit from './pages/blog/BlogEdit'
import BlogDetail from './pages/blog/BlogDetail'
import BlogAdd from './pages/blog/BlogAdd'

import Swal from 'sweetalert2'

//保護路由
import ProtectedRoute from './utils/ProtectedRoute'

function App(props) {
  //判斷使用者是否已登入
  const [userSuccess, setuserSuccess] = useState(false)
  const userlocalStorage = JSON.parse(localStorage.getItem('member')) || []
  const username = userlocalStorage.name

  const { mycart, wishlist } = props
  console.log(wishlist)
  //取得購物車資料
  const localCart = JSON.parse(localStorage.getItem('cart')) || []

  //取得願望清單
  const getwishAsync = async () => {
    const request = new Request(
      `http://localhost:5000/member/wishlist/${userlocalStorage.id}`,
      {
        method: 'get',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    const wishlist = data.map((item)=>item.productId)
    props.dispatch({ type: 'GET_WISH', value: wishlist })
  }
  // 加入願望清單(資料庫)
  const addWishlistAsync = async (productId) => {
    const request = new Request(
      `http://localhost:5000/member/wishlistAdd/${userlocalStorage.id}`,
      {
        method: 'post',
        body: JSON.stringify({ productId }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }
  //加入願望清單
  const addwishlist = (value) => {
    if (!wishlist.includes(value)) {
      const newWishlist = [...wishlist]
      newWishlist.push(value)
      props.dispatch({ type: 'GET_WISH', value: newWishlist })
      addWishlistAsync(value)
    } else {
      alert('已在願望清單')
    }
  }
  //刪除願望清單(資料庫)
  const delwishlistAsync = async(productId)=>{
    const request = new Request(`http://localhost:5000/member/wishlistDel/${userlocalStorage.id}`, {
      method: 'delete',
      body:JSON.stringify({productId}),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
  }

  //刪除願望清單
  const deletewishlist = (productId) => {
    const index = wishlist.indexOf(productId)
    if (index !== -1) {
      const localWishlist = [...wishlist]
      localWishlist.splice(index, 1)
      props.dispatch({ type: 'GET_WISH', value: localWishlist })
      delwishlistAsync(productId)
    }
  }
  //寫入購物車資料
  useEffect(() => {
    getLocation()
    userlocalStorage.success ? setuserSuccess(true) : setuserSuccess(false)
    props.dispatch({ type: 'GET_CART', value: localCart })
    getwishAsync()
  }, [])
  //加入購物車
  const addCart = (value) => {
    const index = localCart.findIndex((item) => item.id == value.id)
    if (index == -1) {
      localCart.push(value)
      props.dispatch({ type: 'GET_CART', value: localCart })
      localStorage.setItem('cart', JSON.stringify(localCart))
    } else {
      localCart[index].amount += 1
      props.dispatch({ type: 'GET_CART', value: localCart })
      localStorage.setItem('cart', JSON.stringify(localCart))
    }
  }
  //刪除購物車
  const deleteCart = (id) => {
    Swal.fire({
      text: '是否刪除該商品?',
      icon: 'warning',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        const newCart = mycart.filter((item) => item.id != id)
        props.dispatch({ type: 'GET_CART', value: newCart })
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
    })
  }
  //購物車金額加總
  const sum = (items) => {
    let total = 0
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].price
      }
    }
    return total
  }

  //地圖定位
  const [viewport, setViewport] = useState({ center: [0, 0], zoom: 15 })
  const [clickData, setClickData] = useState([])
  const [myLocation, setMylocation] = useState([0, 0])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation)
    }
  }
  const updateLocation = (position) => {
    setViewport({
      center: [position.coords.latitude, position.coords.longitude],
    })
    setMylocation([position.coords.latitude, position.coords.longitude])
  }

  const cardClickReset = (clickData) => {
    // console.log(clickData)
    setClickData(clickData)
    setViewport({ center: [clickData.lat, clickData.log] })
  }

  return (
    <Router>
      <>
        <Mynavbar
          deleteCart={deleteCart}
          userSuccess={userSuccess}
          setuserSuccess={setuserSuccess}
          username={username}
        />

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          {/* Blog Routes */}
          <Route path="/blogEdit/:articleId?">
            <BlogEdit />
          </Route>
          <Route path="/blogDetail/:articleId?">
            <BlogDetail />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/blogAdd">
            <BlogAdd />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/productlist/">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/shoppingcar">
            <ShoppingCar
              deleteCart={deleteCart}
              sum={sum}
              userSuccess={userSuccess}
            />
          </Route>
          <Route path="/map">
            <Map
              viewport={viewport}
              getLocation={getLocation}
              cardClickReset={cardClickReset}
              myLocation={myLocation}
            />
          </Route>

          <Route path="/memberuser">
            <MemberUser />
          </Route>
          {/* 保護路由 */}
          <ProtectedRoute path="/paymentDetail">
            <PaymentDetail sum={sum} userSuccess={userSuccess} />
          </ProtectedRoute>
          <ProtectedRoute path="/paymentFinish">
            <PaymentFinish userSuccess={userSuccess} />
          </ProtectedRoute>
          <ProtectedRoute path="/paymentType">
            <PaymentType sum={sum} userSuccess={userSuccess} />
          </ProtectedRoute>
          <Route path="/forgetpwd/:memberId?">
            <Forgetpwd />
          </Route>
          <Route exact path="/">
            <Home addwishlist={addwishlist} deletewishlist={deletewishlist}/>
          </Route>

          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>

        <Myfooter />
      </>
    </Router>
  )
}
const mapStateToProps = (store) => {
  return {
    mycart: store.orderReducer.cartData,
    wishlist: store.orderReducer.wishData,
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)
