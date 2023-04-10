import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Router from "next/router";
// ...

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // 当路由变化时执行这个函数
    const handleRouteChange = () => {
      const token = localStorage.getItem("token"); // 获取 token
      if (!token && router.pathname !== "/login") {
        // 如果没有 token，并且当前路由不是登录页，则跳转到登录页
        Router.push("/login");
      }
    };

    // 监听路由变化
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup 路由监听器
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

   
    return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} />
    </>
	)
}


