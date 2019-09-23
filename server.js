const jwt = require('./src/JWT');
const express = require('express');
const SQLdata = require('./src/mysqlDB')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const app = express()
app.use(express.json())

app.all('/api/*', (req, res, next) => {
    console.log('*******');
    console.log("请求url: " + req.url);
    if (req.url == '/api/getGrade') {
        // 拦截token
        jwt.interceptToken(req.headers.token, (err) => {
            if (err) {
                res.redirect('/api/sessionExp')
            }
            next();
        })
    } else {
        next();
    }
})

app.get('/api/sysErr', async (req, res) => {
    res.status(400).send({ 'status': "no", 'message': "System error." })
})

app.get('/api/sessionExp', async (req, res) => {
    res.status(400).send({ "status": 400, "message": "session_is_expired,please_login_again!" })
})


// 测试数据库连接
app.get('/api', async (req, res) => {
    console.log('请求普通接口');
    res.send('connection_is_ok!')
})

// 注册
app.post('/api/register', async (req, res) => {
    console.log('请求注册接口');

    // 1.先查询有没有相同的用户名
    SQLdata('select username from student where username = ?',
        (err, data) => {
            if (err) {
                res.redirect('/api/sysErr')
            }
            if (data.length === 0) {
                SQLdata('INSERT INTO student(username,password) VALUES(?,?)',
                    (err, data) => {
                        if (err) {
                            res.redirect('/api/sysErr')
                        };
                        res.send({
                            "status": 200,
                            "message": "register_success!",
                            "data": { "username": req.body.username }
                        });
                    },
                    [req.body.username, bcrypt.hashSync(req.body.password, salt)]
                )
            } else {
                res.send({
                    "status": 500,
                    "message": "username_was_register!",
                    "data": { "username": req.body.username }
                })
            }
        }, [req.body.username])

})

// 登录
app.post('/api/login', async (req, res) => {
    console.log('请求登录接口');
    // console.log(req.body);
    SQLdata('select student_id,password from student where username = ? ',
        (err, data) => {
            if (err) {
                res.redirect('/api/sysErr')
            };
            if (data[0] == null) {
                res.send({ "status": 400, "message": "username_is_not_exist!" })
                return;
            } else {
                if (bcrypt.compareSync(req.body.password, data[0].password)) {
                    // token发给前端
                    // token封装了student_id, 后端可以通过解密得到student_id
                    const token = jwt.genToken({ student_id: data[0].student_id })
                    // 成功处理
                    result = { 'status': '200', 'message': 'login_success!', 'token': token }
                    res.status(200).send(result)
                } else {
                    res.send({ "status": 400, "message": "password_is_error!" })
                }
            }
        },
        [req.body.username]
    )
})

// 查分数
app.post('/api/getGrade', async (req, res) => {
    console.log('请求查分数接口');

    SQLdata('SELECT course_name,grade,`status` FROM grade JOIN course ON grade.course_id = course.course_id WHERE grade.student_id= ? ',
        (err, data) => {
            if (err) {
                res.redirect('/api/sysErr')
            };
            // 成功处理
            if (data.length > 0) {
                result = { 'status': '200', 'message': 'get_garde_success!', 'data': data }
            } else {
                result = { 'status': '200', 'message': 'garde_is_null!' }
            }
            res.status(200).send(result)
        },
        [jwt.decodedToken(req.headers.token)]
    )
})


app.listen(8080, () => {
    console.log("http://localhost:8080");
})


