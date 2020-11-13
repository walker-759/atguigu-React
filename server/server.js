const express = require('express')
const bodyParser = require('body-parser')
const bannerM = require('./module/model/bannerM')
const userM = require('./module/model/userM')
const coverM = require('./module/model/coverM')
const videoM = require('./module/model/videoM')
const commentsM = require('./module/model/commentsM')
const HtuserM = require('./module/htmodel/htuserM')
const HtvideoM = require('./module/htmodel/htvideoM')
const qnTokenM = require('./module/htmodel/qnTokenM')
const htcommentsM = require('./module/htmodel/htcommentsM')
const app = express()
app.use(bodyParser.json())

// ********************************用户端***********************************************

/**************banner模块***************** */
// 获取banner列表
app.get('/banner',bannerM.getbannerlist)

/***************用户模块****************************/
// 登录
app.post('/reg',userM.userRegister)
// 注册
app.post('/login',userM.userLogin)


/*******************视频封面模块************************ */ 
// 获取首页视频分页列表
app.get('/coverlist',coverM.getcoverlist)
// 增加播放量
app.put('/coverlist',coverM.updateamount)

/***********************视频播放模块**************** */
// 获取视频详细信息
app.get('/video',videoM.getvideo)

/***********************视频评论模块***************** */
// 添加评论
app.post('/comments',commentsM.addcomments)
// 获取评论
app.get('/comments',commentsM.getcomments)



// ********************************后台管理系统***********************************************

/*********后台用户模块****** */
// 登录
app.post('/htlogin',HtuserM.HTuserLogin)

// 获取用户列表
app.get('/htuserlist',HtuserM.Htgetuserlist)
// 新增后台用户
app.post('/addhtuser',HtuserM.addhtuser)
// 修改后台用户信息
app.put('/updateuser',HtuserM.updateuser)
// 删除后台用户信息
app.delete('/deleteuser',HtuserM.deleteuser)


// ***********后台视频管理模块******************
// 获取视频列表
app.get('/htcoverlist',HtvideoM.getcoverlist)
// 获取视频详细信息
app.get('/htgetvideo',HtvideoM.getvideo)

// 添加视频和视频封面
app.post('/htaddvideo',HtvideoM.htaddvideo)

// 删除视频和视频封面
app.delete('/htremovevideo',HtvideoM.htremovevideo)




// ******************获取七牛云token***********************
app.get('/uploadtoken',qnTokenM.getqnToken)


// ******************后台评论管理模块************************
// 获取评论
app.get('/htgetcomments',htcommentsM.getcomments)

// *********************后台首页模块*****************************
app.get('/htusercount',userM.getusercount)


app.listen(8080, ()=>{
    console.log('8080端口启动');
    
})