//npm init
//npm i express cors
//npm i nodemon -D

const express = require('express');
const router = require('./router');  //当router.js 设置好了以后,回来挂载
const cors = require('cors');


//create a web server
const app = express();

app.use(express.json())// 挂载路由api 之前, 要先解析内容json
//一定要在加载router之前加载cors
app.use(cors());
app.use('/api',router);   //一样,当router.js 设置好了以后,回来挂载

const port = 8000;

app.listen(port,function(){
    console.log('server is running on http://localhost:8000');
});

