const logout = () => {
    sessionStorage.clear()
    window.location.reload()
}

export {
    logout
}