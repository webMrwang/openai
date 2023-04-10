import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from 'next/link'
import Router  from 'next/router';
import "react-toastify/dist/ReactToastify.min.css";
const RegisterPage = () => {
  // 设置 state 保存用户名、手机号、验证码和密码
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");

  // 设置 state 保存倒计时时间
  const [countdown, setCountdown] = useState(60);

  // 设置 state 保存按钮是否可用
  const [disabled, setDisabled] = useState(false);

  // 定义计时器
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      // 如果倒计时还没结束，继续计时
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      // 如果倒计时结束，按钮重新被激活
      setDisabled(false);
    }
    // 组件卸载时清除计时器
   return () => clearTimeout(timer as unknown as number);


  }, [countdown]);

  // 处理发送验证码
  const handleSendVerificationCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Sending verification code to", phoneNumber);

    // 发送验证码的逻辑，比如向服务器发起请求


	fetch('https://api.deepb2b.com/mall/app/register/smsCode/send',{ //发送注册验证码
		method:'post',
		body:JSON.stringify({
			mobile: phoneNumber
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
			toast.success(ret.data)
			// 倒计时开始，按钮不可用
			setCountdown(60);
			setDisabled(true);
		}else{
			console.dir(toast)
			// let router = useRouter()
			
			toast.error(ret.msg, {
			  autoClose: 2000,
			});
		}
		
	})
  };
  

  // 处理表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	 
    event.preventDefault();
    console.log("Username:", username);
    console.log("Phone number:", phoneNumber);
    console.log("Verification code:", verificationCode);
    console.log("Password:", password);
	fetch('https://api.deepb2b.com/mall/app/register',{ // 手机号码注册用户
		method:'post',
		body:JSON.stringify({
			mobile: phoneNumber,
			password:password,
			rePassword:password,
			smsCode:verificationCode
		}),
		headers:{
			'Content-Type':'application/json',
		}
	}).then(data => {
		return data.json();
	}).then(ret => {
		//这里才是得到的最终数据
		console.log(ret);
		if(ret.msg = 'success'){
			toast.success('注册成功')
			Router.push('/login');
		}else{
			
			toast.error("处理表单数据时发生了错误！");
		}
		
	})
    // 处理注册逻辑，比如向服务器发起请求进行注册
  };

  // 渲染注册表单
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>
		  		  <img className="card_logo" src="https://dp-data.obs.cn-south-1.myhuaweicloud.com:443/files%2F9a9ef25331ae421cb66a8aa10c9905f8.png" alt="" />
		  </h1>
 
          <div className="input-group send_input">
            <input
              type="tel"
              id="phoneNumber"
              placeholder="填写您的手机号"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
			  className="send_code"
              disabled={disabled}
              onClick={handleSendVerificationCode}
            >
              {disabled ? `${countdown}s` : "发送验证码"}
            </button>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="verificationCode"
              placeholder="填写您的验证码"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="填写您的密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">注册</button>
          </div>
		  <div className="no_acc">
		  <p>
		  	已有账户？ 
		  			<Link href="/login">
		  			  去登录
		  			</Link>
		  	
		  </p>
		  </div>
        </form>
      </div>
      <style jsx>{`
	   .card_logo{
		width: 200px;
	   }
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
        h1 {
          font-size: 36px;
          color: #004d99;
          margin-bottom: 20px;
          text-align: center;
        }
        .input-group {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        input {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          border: none;
		  border: 1px solid #f2f2f2;
          padding: 0 20px;
          font-size: 14px;
          color: #333;
        }
		.send_input{
			position: relative;
		}
        button {
          height: 40px;
          border-radius: 8px;
          border: none;
          background-color: #0077cc;
          color: #fff;
          font-size: 16px;
          padding: 0 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #005fa3;
        }
		.send_code{
			padding: 0 10px;
			position: absolute;
			right: 0;
			font-size: 14px;
		}
        .button-group {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
	  .button-group button{
	   width: 100%;
	  }

      `}</style>
    </div>
  );
};

export default RegisterPage;
