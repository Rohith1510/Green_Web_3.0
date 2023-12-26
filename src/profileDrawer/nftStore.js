import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import '../index.css';

const NftStore = () => {

    const [copiedAddress, setCopiedAddress] = useState(null);
    
    const nftImages = [
        {path : '../NFT-1.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-2.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-3.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-4.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-5.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-6.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-7.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-8.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
        {path : '../NFT-9.jpg', address : "0xF2cF6888dFf033b852788884B9560E0c652c861F"},
    ];

    const handleCopy = (address) => {
        const textArea = document.createElement("textarea");
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedAddress(address);
    };


    return (
        <div className='nftStore'>
            <h1 style={{fontSize:"2rem", color:"white"}}>NFT STORE PAGE!</h1>
            <Button margin="1rem" _hover={{ backgroundColor: "#33ccff" }}><Link to='/Post'>Go To Home</Link></Button>
            <div className='nftGrid'>
                {nftImages.map((image, index) => (
                    <div key={index} className="nftItem">
                        <img src={image.path} alt={`NFT ${index + 1}`} className='nftImage' onClick={() => handleCopy(image.address)} />
                        <p style={{color:"white", fontSize:"1rem"}}>
                            {copiedAddress === image.address && index+1 === image.id ? "Copied!" : "Click to Copy"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NftStore;
