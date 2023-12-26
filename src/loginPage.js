import { Button } from "@chakra-ui/react";
import "./index.css";

const LoginPage = ({ setAccount }) => {

  async function signIn() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Kindly install your wallet extension!!");
    }
  }

  return (
    <div  className="login" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}} >
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "black", marginLeft: "29rem", marginBottom:"2rem" }}>GREEN WEB</h1>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>
          "Surf the web, save the planet. Embrace a greener digital footprint today!!"
        </h1> <br />
        <div style={{marginLeft:"30rem"}}>
          <Button onClick={signIn} color="rgba(5,32,64)" _hover={{ backgroundColor: "#00b359" }} >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
