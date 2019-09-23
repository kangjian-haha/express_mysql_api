const jwt = require('jsonwebtoken');
const secret = 'kangjian_haha';// 加密钥
const expiresTime = { expiresIn: '1h' };// 过期时间

// 生成token
function genToken(content) {
    var token = jwt.sign(content, secret, expiresTime);
    return token;
}

// 解密token
function decodedToken(token) {
    const decoded =  jwt.verify(token, secret)
    return decoded.student_id;
}

// 拦截token
function interceptToken(token,callback){
    jwt.verify(token, secret, (err) => {
        return callback(err)
    })
}

module.exports.genToken = genToken
module.exports.decodedToken = decodedToken
module.exports.interceptToken = interceptToken

