import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GreenWeb from './greenweb';
import GreenFaucetUi from './profileDrawer/greenWebFaucet';
import ErrorPage from './profileDrawer/404Error';
import Home from './Home';
import LoginPage from './loginPage';
import NftStore from './profileDrawer/nftStore';
import NftGame from './profileDrawer/NftGame';
import CroudFunding from './profileDrawer/croudFunding';

const RouteTab = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<GreenWeb/>}></Route>
                    <Route path='/ConnectWallet' element={<LoginPage/>}></Route>
                    <Route path='/Post' element={<Home/>}></Route>
                    <Route path='/Profile/Faucet' element={<GreenFaucetUi/>}></Route>
                    <Route path='/ErrorPage' element={<ErrorPage/>}></Route> 
                    <Route path='/Profile/NFTStore' element={<NftStore/>}></Route>
                    <Route path='/Profile/NFTGame' element={<NftGame/>}></Route>
                    <Route path='/Profile/CroudFunding' element={<CroudFunding/>}></Route>  
                </Routes>
            </Router>
        </div>
    )
}

export default RouteTab;