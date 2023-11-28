//ES 标准不能使用require 也搜不到有关东西呢

import express from 'express';
var app = new express();
const port = 5173
import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false)
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('a')
})

//录入用户
app.post('/api/user', async(req, res)=> {
    const user = await User.create(req.body)
    res.send(user)
})

//删除用户
app.delete('/api/user/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})

//修改更新用户回显信息
app.get('/api/user/:id', async (req, res) => {
    const user = await User.findById(req.body)
    res.send(user)
})

//进行更新用户信息
app.put('/api/confirmUpdata/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(res.params.id, req.body)
    res.send(user)
})

mongoose.connect('mongodb://localhost:5173/todolist',{
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})

//创建一个类，放一下前端传进来的数据
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String },
    userpassword: { type: String },
    userlogintime: { type: String },
    DataClass: { type: String }
}))

app.listen(port, () => {
    console.log('success');
})
