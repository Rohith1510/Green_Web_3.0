import React from 'react';
import { Button } from "@chakra-ui/react";
import {Link} from 'react-router-dom';

const CroudFunding = () => {
    return(
        <div>
            <h1>WEB3 CROUD FUNDING PAGE</h1>
            <p>Comming Soon !!</p>
            <Button margin="1rem"><Link to='/Post'>Go To Home</Link></Button>
            <Button margin="1rem"><Link to='/Profile/NFTStore'>Go To Store</Link></Button>
        </div>
    )
}
export default CroudFunding;