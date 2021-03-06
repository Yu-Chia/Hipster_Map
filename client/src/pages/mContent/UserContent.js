import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Figure, Modal } from 'react-bootstrap'
import '../../styles/mContent/usercontent.scss'

function UserContent() {
  //切換顯示&編輯
  const [edit, setedit] = useState(false)
  //編輯下>切換生日輸入欄樣式
  const [brthdayedit, setbrthdayedit] = useState(false)
  //更新完成小視窗
  const [showUpdateOk, setshowUpdateOk] = useState(false)
  //存放上傳圖片資訊
  const [imgData, setimgData] = useState('')
  // console.log('imgData:', imgData)
  const userId = {
    memberId: JSON.parse(localStorage.getItem('member')).id,
  }

  //顯示會員資料
  const [mdata, setmdata] = useState('') //回傳資料存放
  const memberId = mdata.memberId
  const memberName = mdata.memberName
  const memberGender = mdata.memberGender
  const memberBirth = new Date(mdata.memberBirth).toLocaleDateString()
  const memberPhone = mdata.memberPhone
  const memberAddress = mdata.memberAddress
  const memberMail = mdata.memberMail
  const memberPwd = mdata.memberPwd
  const memberImg = mdata.memberImg
  // console.log(mdata)

  //存放個欄位輸入值
  let editmemberName,
    editmemberGender,
    editmemberBirth,
    editmemberPhone,
    editmemberAddress,
    editmemberPwd,
    editmemberImg,
    editAllData

  //網頁仔入時啟動
  useEffect(() => {
    memberData(userId)
  }, [])

  //抓取該會員全部資料
  async function memberData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/getmemberdata/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setmdata(data)
  }

  //更新會員資料
  async function memberUpdate(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/updatememberdata/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)

    localStorage.setItem('member', JSON.stringify(data))
  }

  // 更新會員圖片
  const memberimgUpdate = (data) => {
    let formData = new FormData()
    formData.append('avatar', data)
    formData.append('memberId', memberId)
    formData.append('memberImg', memberImg)
    formData.append('memberImgState', editmemberImg.files.length)
    // console.log(formData.get('avatar'))
    fetch('http://localhost:5000/updatememberimgdata', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        // console.log(res)
        // console.log(res.statusText)
        return res.json()
      })
      .then((obj) => {})
  }

  //即時預覽上傳圖片
  function previewFile() {
    var preview = document.getElementById('demoimg')
    var file = document.getElementById('ControlFile1').files[0]
    var reader = new FileReader()
    reader.onloadend = function () {
      preview.src = reader.result
    }
    if (file) {
      reader.readAsDataURL(file)
    } else {
      preview.src = ''
    }
  }

  const dataDisplay = (
    <>
      {/* <Figure>
        <Figure.Image
          className="memberimg"
          alt="會員頭像"
          src={`http://localhost:5000/images/member/${memberImg}`}
        />
      </Figure> */}
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberName">
            <Form.Label>會員名稱：</Form.Label>
            <Form.Text className="text-muted">{memberName}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberGender">
            <Form.Label>性別：</Form.Label>
            <Form.Text className="text-muted">{memberGender}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberBirth">
            <Form.Label>出生日期：</Form.Label>
            <Form.Text className="text-muted">{memberBirth}</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberPhone">
            <Form.Label>連絡電話：</Form.Label>
            <Form.Text className="text-muted">{memberPhone}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="displaymemberAddress">
            <Form.Label>連絡地址：</Form.Label>
            <Form.Text className="text-muted">{memberAddress}</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberMail">
            <Form.Label>信箱帳號：</Form.Label>
            <Form.Text className="text-muted">{memberMail}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberPwd">
            <Form.Label>登入密碼：</Form.Label>
            <Form.Text className="text-muted">已設置登入密碼</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Button
        className="EditBtn"
        variant="primary"
        type="button"
        onClick={() => {
          setedit(true)
        }}
      >
        編輯
      </Button>
    </>
  )

  const editDisplay = (
    <>
      <Figure className="Figurepic">
        <Figure.Image
          id="demoimg"
          className="memberimg"
          alt="會員頭像"
          src={`http://localhost:5000/images/member/${memberImg}`}
        />
      </Figure>

      <Form.File.Input
        type="file"
        multiple="multiple"
        id="ControlFile1"
        name="memberimg"
        ref={(file) => (editmemberImg = file)}
        onChange={(e) => {
          setimgData(e.target.files[0])
          previewFile()
        }}
      />

      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>會員名稱：</Form.Label>
            <Form.Control
              ref={(input) => (input == '' ? '' : (editmemberName = input))}
              type="text"
              id="editmemberName"
              placeholder={memberName}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>性別：</Form.Label>
            <Form.Control
              ref={(input) => (editmemberGender = input)}
              id="editmemberGender"
              as="select"
            >
              <option value={memberGender}>{memberGender}</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>出生日期：</Form.Label>
            {brthdayedit ? (
              <>
                <Form.Control
                  type="date"
                  id="editmemberBirth"
                  defaultValue={memberBirth}
                  ref={(input) =>
                    input == '' ? memberBirth : (editmemberBirth = input)
                  }
                />
              </>
            ) : (
              <Form.Control
                ref={(value) => (editmemberBirth = value)}
                type="text"
                value={memberBirth}
                onClick={() => {
                  setbrthdayedit(true)
                }}
              />
            )}
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>連絡電話：</Form.Label>
            <Form.Control
              ref={(input) => (input == '' ? '' : (editmemberPhone = input))}
              type="text"
              placeholder={memberPhone}
              id="editmemberPhone"
            />
          </Form.Group>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>連絡地址：</Form.Label>
            <Form.Control
              ref={(input) => (input == '' ? '' : (editmemberAddress = input))}
              type="text"
              placeholder={memberAddress}
              id="editmemberAddress"
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="row-bottom">
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>信箱帳號：(不可更改)</Form.Label>
            <Form.Control type="email" disabled placeholder={memberMail} />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>登入密碼：</Form.Label>
            <Form.Control
              ref={(input) => (input == '' ? '' : (editmemberPwd = input))}
              type="text"
              id="editmemberPwd"
              placeholder="如未需更換，則不用填寫"
            />
          </Form.Group>
        </Col>
      </Form.Row>

      <Button
        className="cancelBtn"
        variant="primary"
        type="button"
        onClick={() => {
          setedit(false)
        }}
      >
        取消
      </Button>
      <Button
        className="submitBtn"
        variant="primary"
        type="Button"
        onClick={() => {
          editAllData = {
            memberId: JSON.parse(localStorage.getItem('member')).id,
            memberName:
              editmemberName.value == '' ? memberName : editmemberName.value,
            memberGender: editmemberGender.value,
            memberBirth:
              editmemberBirth.value == '' ? memberBirth : editmemberBirth.value,
            memberPhone:
              editmemberPhone.value == '' ? memberPhone : editmemberPhone.value,
            memberAddress:
              editmemberAddress.value == ''
                ? memberAddress
                : editmemberAddress.value,
            memberPwd:
              editmemberPwd.value == '' ? memberPwd : editmemberPwd.value,
            memberImg: memberImg,
            memberImgState: editmemberImg.files.length,
          }
          memberimgUpdate(imgData)
          memberUpdate(editAllData)
          setshowUpdateOk(true)
        }}
      >
        更新
      </Button>
    </>
  )
  //更新完成視窗
  function UpdateOk(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <p className="SignOk-title">更新成功</p>
          <div
            className="SignOkbtn"
            onClick={() => {
              memberData(userId)
              setedit(false)
              setshowUpdateOk(false)
              setimgData('')
              window.location.href = '/memberuser/user/'
            }}
          >
            確認
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <UpdateOk show={showUpdateOk} onHide={() => setshowUpdateOk(false)} />
      <div className="usercontainer">
        <div className="usertitle">會員資料</div>

        <Form>{edit ? editDisplay : dataDisplay}</Form>
      </div>
    </>
  )
}

export default UserContent
