import { Image, Drawer, Button, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,useDisclosure} from "@chakra-ui/react";
import { Divider } from '@chakra-ui/react'
import {Link} from 'react-router-dom';

function ProfilePage(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const disConnectWallet = () => {
        props.setAccount(false);
    }
    return (
        <div>
            <Image alt="Green Web Symbol" src="/default-avatar.png" width="100px" height="100px" onClick={onOpen}/>
            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>WELCOME USER !!</DrawerHeader>
                <DrawerBody>
                        <Button variant="contained" padding="1rem"><Link to='/Profile/NFTGame'> NFT GAME </Link></Button>
                        <Divider orientation='horizontal' />
                        <Button variant="contained" padding="1rem"><Link to='/Profile/Faucet'> GREEN WEB FAUCET </Link></Button>
                        <Divider orientation='horizontal' />
                        <Button variant="contained" padding="1rem"> <Link to='/Profile/NFTStore'> NFT SHOW CASE  </Link></Button>
                        <Divider orientation='horizontal' />
                        <Button variant="contained" padding="1rem"> <Link to='/Profile/CroudFunding'> WEB3 CROUD FUNDING  </Link></Button>
                        <Divider orientation='horizontal' />
                    <Button marginTop="21rem" marginLeft="2rem" onClick={disConnectWallet}  _hover={{ backgroundColor: "#e60000" }}><Link to='/'>  DISCONNECT WALLET  </Link></Button>
                </DrawerBody>
            </DrawerContent>
            </Drawer>
        </div>
    )
}

export default ProfilePage;