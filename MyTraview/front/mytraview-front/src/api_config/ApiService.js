import { API_BASE_URL} from "./ApiBaseUrl";

export function call(api, method, req){
    let headers = new Headers({
        "Content-Type" : "application/json",
    
    });

    const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    if(req){
        options.body = JSON.stringify(req)
    }

    return fetch(options.url, options)
    .then((res)=>{
        if(res.ok||res.status===400){
            return res.json();
        } else {
            new Error(res);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

export const viewCountIncrease = (id) => {
    call(`/article/views?id=${id}`, "GET")
        .then((res) => {
            console.log(res);
        })
}

