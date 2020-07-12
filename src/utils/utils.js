/*设置名为userName和userPass的两个cookie*/
export function setCookie(c_name,c_pass,expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + 24*60*60*1000*expireDays);//设置有效日期
    window.document.cookie="userName="+c_name+";path=/"+((expireDays===null ? "": ";expires="+date.toUTCString()));
    window.document.cookie="userPass="+c_pass+";path=/"+((expireDays===null ? "": ";expires="+date.toUTCString()));

}
/*获取两条cookie的值*/
export function getCookie(){
    let cookieLogin={};
    let arr=window.document.cookie.split(';');//这里显示的格式需要切割
    if(arr.length<2) return 0;
    console.log(document.cookie);

    for(let i=0,len=arr.length;i<len;i++){
        let arr2=arr[i].split('=');//再次切割
        //替换空格
        arr2[0]=arr2[0].trim();
        //判断查找相对应的值
        if(arr2[0]==='userName'){
            cookieLogin.userName=arr2[1];
        }else if(arr2[0]==='userPass'){
            cookieLogin.password=arr2[1];
        }
    }
    return cookieLogin
}
/*删除两条cookie*/
export function clearCookie(c_name,c_pass) {
    /*将cookie的失效日期设置为当前的前一天*/
    let date = new Date();
    date.setTime(-1000);
    window.document.cookie="userName="+c_name+";path=/;expires="+date.toUTCString();
    window.document.cookie="userPass="+c_pass+";path=/;expires="+date.toUTCString();
}
