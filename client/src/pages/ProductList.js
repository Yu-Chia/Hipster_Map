import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../styles/ProductList.scss'

import AsideBar from '../components/product/AsideBar'
import ProductListMainContent from '../components/product/ProductListMainContent'
import ProductSearchResult from '../components/product/ProductSearchResult'
import ProductSearchResultSort from '../components/product/ProductSearchResultSort'
import ProductListPageBar from '../components/product/ProductListPageBar'

import { getProductListAsync } from '../actions/product/getProductList'

import ReactStars from 'react-rating-stars-component'

function ProductList(props) {
  const { productListData, getProductListAsync } = props

  useEffect(() => {
    getProductListAsync()
  }, [])

  return (
    <>
      <div className="container product-content">
        <div className="row">
          <AsideBar />
          <ProductListMainContent>
            <ProductSearchResult productnumbers={productListData.length} />
            <ProductSearchResultSort />
            {/* -------商品列表區域------ */}
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8 px-15">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description">
                        無經驗的新手也能輕鬆做出甜點！位於台北捷運國父記念館站的Funsiamo
                        玩美烘焙體驗，透過
                        iPad數位教學，搭配現場服務人員的親切協助，每個走進店裡的人都能帶走精美成品與滿滿成就感，無論是自行享用或送禮都非常合適。
                      </p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer ">
                        <div className="product-star">
                          <ReactStars
                            value={3}
                            count={5}
                            size={20}
                            half={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </div>
                        <span className="divider"></span>
                        <div className="product-booked-number">
                          6.7K+ 個已訂購
                        </div>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            {/* -------商品列表區域------ */}
            <ProductListPageBar />
          </ProductListMainContent>
        </div>
      </div>
    </>
  )
}

// 將redux中的store的state(狀態)
// 對應到這個元件中的props中
const mapStateToProps = (store) => {
  return { productListData: store.productReducer.productListData }
}

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }

// 高階元件的樣式，必要的
export default connect(mapStateToProps, {
  getProductListAsync,
})(ProductList)
