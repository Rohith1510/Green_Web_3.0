import Home from "./Home";
import LoginPage from "./loginPage";
import React,{useState} from "react";

const GreenWeb = () => {

    const [account, setAccount] = useState(null); 

    return(
        <div>
            {
            account ?  <Home  setAccount={setAccount}/> : <LoginPage setAccount={setAccount}/>
            }
        </div>
    )
}

export default GreenWeb;