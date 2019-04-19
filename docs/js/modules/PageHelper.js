class PageHelper {
    static saveToken(token){
        localStorage.setItem('token', token)
    }

    static getToken(){
        return localStorage.getItem('token')
    }
}

export default PageHelper