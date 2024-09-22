const express = require('express');

//create router instance
const router = express.Router();



let users = [ 
    { id: 1, name: "Ben", age: 20 }, 
    { id: 2, name: "John", age: 30 }, 
    { id: 3, name: "Chris", age: 40 }, 
    { id: 4, name: "Jane", age: 60 }, ];

//calculate the next available user id
function getNextUserId(users){
    //[1,2,3,4]
    const userIds = users.map(function(user){
        return user.id;
    });
    //...意思是把array 展开,因为math.max 认不到array
    return Math.max(...userIds, -1) + 1;  
    //当math.max() 的参数为空,无论参数是数组还是数字都返回-infinity
    //-Infinity 是表示没有更小的值，适用于空的情况，因为这意味着没有可比较的数字，最大值无法定义
}

//GET fetch all users
router.get('/users',function(req,res){
    res.status(200).json({
        status:'success',
        message:'Retrieved users successfully',
        data:users,
    });
});


//POST add a new user
router.post('/users',function(req,res){
    const newUser = req.body;
    if(!newUser.name || !newUser.age){
        return res.status(400).json({
            status:'Error',
            message:'Name and age are required'
        });
        
    }
    const newId = getNextUserId(users);
    let obj = {id:newId, name:newUser.name, age:newUser.age};
    users.push(obj);
    res.status(200).json({
        status:'success',
        message:'User added successfully',
        data:users,
    })

})
//DELETE delete all users
router.delete('/users',function(req,res){
    users = [];
    res.status(204).send();
})
//DELETE delete user by id
router.delete('/users/:id',function(req,res){
    //接收请求：用户通过 URL /users/:id 发起 DELETE 请求，服务器接收这个请求
    const userIdToDelete = parseInt(req.params.id);//req.params 获得的数据是string
    //获取参数：从 URL 中获取用户 id，并将其转换为整数，存储在 userIdToDelete 中
    const initialUserCount = users.length;
    //过滤用户列表：通过 filter() 方法删除与 userIdToDelete 匹配的用户。
    users = users.filter(function(user){
        return user.id !==userIdToDelete
    })
    //判断是否成功删除
    //如果删除前后的 users 数量相同，返回 404 错误，表示用户未找到。
    if(users.length ===initialUserCount){
        return res.status(404).json({
            status:'error',
            message:'User not found'
        })
    }
    //如果用户数量发生变化，说明用户已成功删除，返回 200 状态码和成功消息
    res.status(200).json({
        status:'success',
        message:`User with ID ${userIdToDelete} deleted successfully`,
        data:users,
    });
}) 

module.exports = router;  