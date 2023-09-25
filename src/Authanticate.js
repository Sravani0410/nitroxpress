import { reactLocalStorage } from 'reactjs-localstorage';

           

export const TokenDataValidCheck = () => {


    const tokenData = () => {

        let BearerToken = sessionStorage.getItem("token", false);

        if (!BearerToken) {
            return ("#/login")
        }
        else {
            // return ("#/")
        }

    }



    return tokenData();
};
