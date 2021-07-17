import axios from "axios";
import { Toast } from 'vant'

export function request(config) {
    const instance = axios.create({
        baseURL: "https://api.shop.eduwork.cn",
        timeout: 5000,
    });

    // 请求拦截
    // let reqNum = 0;
    instance.interceptors.request.use(
        config => {
            // 在请求发出之前进行一些操作，每次发出请求就 reqNum++
            // reqNum++;

            //处理需要认证才可以访问的接口，比如token认证
            const token = window.localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = "Bearer" + token; //添加请求头
            }

            return config;
        },
        err => {
            return err;
        }

    );

    // 响应拦截
    instance.interceptors.response.use(
        res => {
            // reqNum--;
            // if (reqNum >= 0)
            return res.data ? res.data : res;
        },
        err => {
            // 如果有错误，这里需要处理，显示错误信息
            console.log('响应拦截', err);
            // console.log('响应拦截', err.response.data.message, err.response.data.status_code);
            //登录接口的错误处理
            if (err.response.data.status_code === 401)
                Toast('账户或密码错误')

            //处理提交的注册信息错误时，用Toast提示用户表单错误的地方
            if (err.response.data.errors) {
                const msg = Object.entries(err.response.data.errors);
                let toastMsg = '';
                msg.forEach(item => {
                    console.log(item[1][0]);
                    toastMsg += item[1][0] + '\n';
                });
                Toast.allowMultiple(true);
                Toast(toastMsg);
            }
            // return Promise.reject(err);
        }
    );

    return instance(config);
}
