import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "", // 基础路径
    timeout: 10000, // 中断
    headers: {
        // 公共的请求头参数
    },
})
// 响应拦截
axiosInstance.interceptors.response.use((res) => {
    return res.data;
})
// 请求拦截
axiosInstance.interceptors.request.use(config => {
    // const token= localStorage.getItem("userInfo") && localStorage.getItem("userInfo").userToken
    let token = ''
    if(localStorage.getItem("userInfo")){
        token=JSON.parse(localStorage.getItem("userInfo")).userToken
        // console.log(token);
    }else{
        token=null
    }
    config.headers = {
        authorization: token
    }
    return config;
})
export default axiosInstance;