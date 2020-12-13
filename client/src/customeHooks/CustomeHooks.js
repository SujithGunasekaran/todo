export const useLogoutAction = () =>{

    const logoutState = () =>{
        window.sessionStorage.clear()
        window.localStorage.clear()
    }

    return{
        logoutState,
    }
};