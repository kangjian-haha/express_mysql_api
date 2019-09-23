# express_mysql_api 作业
## 启动项目

```bash
## 导依赖
cnpm install
## 启动项目
cnpm start
```

## API
### 1.注册

```
POST /api/register
```

参数

```
Content-Type: application/json

username: user2
password: password
```

返回

```json
{
  "status": 200,
  "message": "register_success!",
  "data": {
    "username": "user2"
  }
}
```

### 2.登录

```
POST /api/login
```
参数
```
Content-Type: application/json

username: user1
password: password
```
返回
```json
{
  "status": "200",
  "message": "login_success!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjo5LCJpYXQiOjE1NjkxMzUxMTMsImV4cCI6MTU2OTEzODcxM30.OIg6kLmjBmwjbBRWt0PmH7-sCW02iWOY-OwloMFWs-g"
}
```
### 3.查分数

```
POST /api/getGrade
```

参数

```
Content-Type: application/json
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjo5LCJpYXQiOjE1NjkxMzM0ODcsImV4cCI6MTU2OTEzNzA4N30.khBZj1vmuVd5v2Nc7B4obDSDCjaW6iFiomSp1TJNKXQ

```

返回

```json
{
  "status": "200",
  "message": "get_garde_success!",
  "data": [
    {
      "course_name": "java开发",
      "grade": 80,
      "status": 1
    }
  ]
}
```

### 