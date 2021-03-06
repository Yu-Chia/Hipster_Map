const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module2");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

//訂單列表
router.get("/comments/:memberId", async (req, res) => {
  const data = {
    comment: [],
    notcomment: [],
  };

  const sqlnotcommentlist =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`commentImg`,`comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`,`product`.`productImg`, `item_lists`.`memberId` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `item_lists`.`memberId` = ? AND `item_lists`.`date`<= CURDATE() AND `comments`.`content` IS NULL ORDER BY `comments`.`updated_at` DESC";

  const sqlcommentlist =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`commentImg`,`comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`,`product`.`productImg`, `item_lists`.`memberId` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `item_lists`.`memberId` = ?  AND `comments`.`content` IS NOT NULL ORDER BY `comments`.`updated_at` DESC";

  const [r1] = await db.query(sqlcommentlist, [req.params.memberId]);
  const [r2] = await db.query(sqlnotcommentlist, [req.params.memberId]);

  data.comment = r1;
  data.notcomment = r2;

  res.json(data);
});

//新增評論到資料庫
router.post("/sendComments", async (req, res) => {
  console.log(req.body);

  const addCommentList =
    "UPDATE `comments` SET `content`=?, `star` = ?,`commentImg`=? ,`updated_at`=? WHERE `itemListId`=?";

  const filename = req.body.fileName.split(".").pop();

  const commentImg =
    req.body.fileLength > 0
      ? `commentImg_${req.body.itemListId}.${filename}`
      : "0";
  // console.log(commentImg);
  const [r2] = await db.query(addCommentList, [
    req.body.commentContent,
    req.body.star,
    commentImg,
    null,
    req.body.itemListId,
  ]);
  res.json("ok");
});

// 評論圖片新增到後端資料夾
router.post("/commentimgdata", upload.single("avatar"), async (req, res) => {
  console.log(req.file, req.body.itemListId);

  const filename = req.file.filename.split(".").pop(); //副檔名
  if (req.file && req.file.path) {
    fs.rename(
      req.file.path,
      __dirname +
        "/../public/images/comments/" +
        "commentImg_" +
        req.body.itemListId +
        "." +
        filename,
      (error) => {}
    );
  }

  res.json("ok");
});

module.exports = router;
