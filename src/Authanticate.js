import { reactLocalStorage } from 'reactjs-localstorage';

           

export const TokenDataValidCheck = () => {


    const tokenData = () => {

        let BearerToken = reactLocalStorage.get("token", false);
        console.log(BearerToken)
        if (!BearerToken) {
            return ("#/login")
        }
        else {
            return ("#/")
        }

    }



    return tokenData();
};
