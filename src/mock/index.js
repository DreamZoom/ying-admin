import Mock from 'mockjs'

Mock.mock("/api/oauth/token","post",(req, res) => {
    res.send({
        name:"@name",
        token:"@token",
        authority:["user","admin"]
    });
});
Mock.mock("/api/oauth/user","post",(req, res) => {
    res.send({
        name:"@name",
        token:"@token",
        authority:["user","admin"]
    });
});