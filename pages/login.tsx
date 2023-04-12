import { useState } from "react";
import Link from 'next/link'
import Router  from 'next/router';
import { toast } from "react-toastify";
const LoginPage = () => {
  // 设置 state 保存用户名和密码
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 处理表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("Username:", username);
 // let result =  fetch('https://api.deepb2b.com/mall/app/newlogin',{
 //        headers: {
 //            Accept: 'application/vnd.dpexpo.v1+json' //设置请求头
 //        },
 //        method: 'post',
	// 	body:{
	// 		"mobile": "18899753632",
	// 		"password": "123456"
	// 	}
 //    })
 //    let res =  result.json() //必须通过此方法才可返回数据
	
 //    const {data: {data}} = res
	// console.log(data,'datadatadata')
 //    return {
 //        props: {
 //            data //props值传导render函数中
 //        }
 //    }
	
	
	fetch('https://api.deepb2b.com/mall/app/newlogin',{
		method:'post',
		body:JSON.stringify({
			mobile: username,
			password: password
		}),
		headers:{
			'Content-Type':'application/json',
		}
	}).then(data => {
		return data.json();
	}).then(ret => {
		//这里才是得到的最终数据
		console.log(ret.data);
		if(ret.data){
			toast.success('登录成功')
			localStorage.setItem('token',ret.data.token)
			Router.push('/');
		}else{
			toast.error(ret.msg)
		}
		
	})
	//后台接收参数为req.body.uname + '--' + req.body.age

    // 处理登录逻辑，比如向服务器发起请求进行验证
  };

  // 渲染登录表单
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>
		  <img className="card_logo" src="https://dp-data.obs.cn-south-1.myhuaweicloud.com:443/files%2F9a9ef25331ae421cb66a8aa10c9905f8.png" alt="" />
		  </h1>
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">登录</button>
          </div>
		  <div className="no_acc">
		  <p>
		  	还没有账户？ 
			<Link href="/register">
			  注册一个
			</Link>
		  	
		  </p>
		  </div>
        </form>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card {
		  min-width: 300px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          padding: 50px;
          border-radius: 8px;
		   max-width: 400px;
        }
		.card_logo{
			width: 200px;
		}
        h1 {
          font-size: 50px;
          color: #004d99;a
          margin-bottom: 40px;
          text-align: center;
        }
        .input-group {
          width: 100%;
          margin-bottom: 20px;
        }
        input {
		  width: calc(100% - 40px);
          height: 40px;
          border-radius: 5px;
          border: none;
          background-color: #f2f2f2;
          padding: 0 20px;
          font-size: 14px;
          color: #333;
        }
        .button-group {
          display: flex;
          justify-content: center;
          margin-top: 40px;
		  font-size: 14px;
        }
        button {
		  width: 100%;
          height: 40px;
          border-radius: 5px;
          border: none;
          background-color: #409eff;
          color: #fff;
          font-size: 14px;
          padding: 0 40px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #005fa3;
        }
		.no_acc{
			font-size:14px;
		}
		
      `}</style>
    </div>
  );
};

export default LoginPage;
