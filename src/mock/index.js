import Mock from 'mockjs'

Mock.mock("/api/oauth/token", "post", (req, res) => {
    res.send({
        name: "@name",
        token: "@token",
        authority: ["user", "admin"]
    });
});
Mock.mock("/api/oauth/user", "post", (req, res) => {
    res.send({
        name: "@name",
        token: "@token",
        authority: ["user", "admin"]
    });
});


//
Mock.mock("/api/news/channel/page-list", (request) => {
    console.log(request);
    return Mock.mock({
        "list|10": [{
            'id|+1': 1,
            name: "@name",
        }],
        records: 1000,
        page: 1,
        size: 20
    });
});