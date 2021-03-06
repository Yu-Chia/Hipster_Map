import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import '../../styles/product/ProductListPageBar.scss'

function ProductListPageBar(props) {
  const { productnumbers, currentPage, perPage, moveto, setLoading } = props
  const searchParams = new URLSearchParams(props.location.search)
  const Top = moveto ? moveto : 0
  const perpage = perPage
  const totalpages =
    productnumbers === 0 ? 1 : Math.ceil(productnumbers / perpage)
  const groupCount = 5
  const [startPage, setStartPage] = useState(1)

  // const currentPage = !!searchParams.get('page') ? +searchParams.get('page') : 1
  function startPageset(targetpage) {
    if (targetpage >= groupCount) {
      setStartPage(targetpage - 2)
    } else if (targetpage < groupCount) {
      setStartPage(1)
    } else if (currentPage === 1) {
      setStartPage(1)
    }
  }
  const display = () => {
    let pages = []
    pages.push(
      <li key={'previous'}>
        <a
          className={+currentPage > 1 ? 'prepage' : 'prepage disabled'}
          // to={`?page=${i}`}
          onClick={() => {
            setLoading(true)
            searchParams.set('page', currentPage - 1)
            window.scrollTo({ top: Top, behavior: 'smooth' })
            props.history.push(`?${searchParams.toString()}`)
            startPageset(currentPage - 1)
          }}
        >
          上一頁
        </a>
      </li>
    )
    if (totalpages <= 7) {
      for (let i = 1; i <= totalpages; i++) {
        pages.push(
          <li key={i}>
            <a
              className={i === currentPage ? 'active' : ''}
              // to={`?page=${i}`}
              onClick={() => {
                setLoading(true)
                searchParams.get('page')
                  ? searchParams.set('page', i)
                  : searchParams.append('page', i)
                window.scrollTo({ top: Top, behavior: 'smooth' })
                props.history.push(`?${searchParams.toString()}`)
                startPageset(i)
              }}
            >
              {i}
            </a>
          </li>
        )
      }
    } else {
      pages.push(
        <li key={1}>
          <a
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => {
              setLoading(true)
              searchParams.get('page')
                ? searchParams.set('page', 1)
                : searchParams.append('page', 1)
              window.scrollTo({ top: Top, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
              startPageset(1)
            }}
          >
            1
          </a>
        </li>
      )
      let pageLength = 0
      if (groupCount + startPage > totalpages) {
        pageLength = totalpages
      } else {
        pageLength = groupCount + startPage
      }
      if (currentPage >= groupCount) {
        pages.push(
          <li key={-1}>
            <a className="disabled">···</a>
          </li>
        )
      }
      for (let i = startPage; i < pageLength; i++) {
        // console.log(startPage)
        if (i <= totalpages - 1 && i > 1) {
          pages.push(
            <li key={i}>
              <a
                className={currentPage === i ? 'active' : ''}
                onClick={() => {
                  setLoading(true)
                  searchParams.get('page')
                    ? searchParams.set('page', i)
                    : searchParams.append('page', i)
                  window.scrollTo({ top: Top, behavior: 'smooth' })
                  props.history.push(`?${searchParams.toString()}`)
                  startPageset(i)
                }}
              >
                {i}
              </a>
            </li>
          )
        }
      }
      if (totalpages - startPage > groupCount) {
        pages.push(
          <li key={-2}>
            <a className="disabled">···</a>
          </li>
        )
      }
      pages.push(
        <li key={totalpages}>
          <a
            className={currentPage === totalpages ? 'active' : ''}
            onClick={() => {
              setLoading(true)
              searchParams.get('page')
                ? searchParams.set('page', totalpages)
                : searchParams.append('page', totalpages)
              window.scrollTo({ top: Top, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
              startPageset(totalpages)
            }}
          >
            {totalpages}
          </a>
        </li>
      )
    }

    pages.push(
      <li key={'next'}>
        <a
          className={
            currentPage === totalpages ? 'nextpage disabled' : 'nextpage'
          }
          // to={`?page=${i}`}
          onClick={() => {
            setLoading(true)
            searchParams.set('page', currentPage + 1)
            window.scrollTo({ top: Top, behavior: 'smooth' })
            props.history.push(`?${searchParams.toString()}`)
            startPageset(currentPage + 1)
          }}
        >
          下一頁
        </a>
      </li>
    )
    return pages
  }

  useEffect(() => {
    startPageset(currentPage)
  }, [])
  useEffect(() => {
    startPageset(currentPage)
  }, [currentPage])

  return (
    <>
      <ul className="page-bar">{display()}</ul>
    </>
  )
}

export default withRouter(ProductListPageBar)
