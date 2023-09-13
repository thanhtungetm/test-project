function getUserInfo(){
    const user = JSON.parse(localStorage.getItem('user-info'))
    return user
}

const helper = {
    getUserInfo
}

export default helper