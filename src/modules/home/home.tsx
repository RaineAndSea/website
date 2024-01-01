import { Navigate } from "react-router-dom";
import { decodeUser } from "../../util/cookies/auth-cookies";

export const Home = () => {

    const user = decodeUser();
    if(!user) {
        return <Navigate replace to='/auth' />
    }
    
    return(
        <>hello</>
    )
}