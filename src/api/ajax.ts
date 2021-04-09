import axios from "axios";

//封装axios
// @ts-ignore
export default function ajax(url:string, data:any={}, method:string='GET'):Promise<any> {
    switch (method){
        case 'GET':
            return axios.get(url, { params: data})
        case 'POST':
            return axios.post(url, data)

    }
}