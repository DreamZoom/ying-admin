import Mock from 'mockjs'

Mock.mock("/api/user/login","get",(req, res) => {
    res.send({
        name:"@name",
        token:"@token",
        authority:["user","admin"]
    })
})