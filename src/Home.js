import { useEffect, useState } from "react";
import {urlClient, LENS_HUB_CONTRACT_ADDRESS, queryRecommendedProfiles, queryExplorePublications} from "./queries";
import LENSHUB from "./lensHub";
import { ethers } from "ethers";
import { Box, Image } from "@chakra-ui/react";
import ProfilePage from './profilePage';

function Home(props) {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);

  async function getRecommendedProfiles() {
    const response = await urlClient
      .query(queryRecommendedProfiles)
      .toPromise();
    const profiles = response.data.recommendedProfiles.slice(0, 5);
    setProfiles(profiles);
  }

  async function getPosts() {
    const response = await urlClient
      .query(queryExplorePublications)
      .toPromise();

    const posts = response.data.explorePublications.items.filter((post) => {
      if (post.profile) return post;
      return "";
    });
    setPosts(posts);
  }

  async function follow(id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      provider.getSigner()
    );
    const tx = await contract.follow([parseInt(id)], [0x0]);
    await tx.wait();
  }

  useEffect(() => {
    getRecommendedProfiles();
    getPosts();
  }, []);

  const parseImageUrl = (profile) => {
    if (profile) {
      const url = profile.picture?.original?.url;
      if (url && url.startsWith("ipfs:")) {
        const ipfsHash = url.split("//")[1];
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      }
      return url;
    }
    return "/default-avatar.png";
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <Box width="100%" backgroundColor="rgba(5, 32, 64, 28)">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="55%" margin="auto" color="white" padding="10px 0">
        <Image alt="Green Web Symbol" src="/4.png" width="100px" height="100px" marginLeft='-190px' />
          <Box marginLeft='-21rem'>
            <Box fontFamily="DM Serif Display" fontSize="50px"> GREEN WEB </Box>
            <Box fontSize="20px"> A Decentralized SocialMedia </Box> 
          </Box>
          <Box>
            <ProfilePage setAccount={props.setAccount}/>
            <h2 style={{marginLeft: "1.4rem"}}>PROFILE</h2>
          </Box>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box display="flex" justifyContent="space-between" width="55%" margin="35px auto auto auto" color="white">
        {/* POSTS */}
        <Box width="65%" maxWidth="65%" minWidth="65%">
          {posts.map((post) => (
            <Box
              key={post.id}
              marginBottom="25px"
              backgroundColor="#03444d"
              padding="40px 30px 40px 25px"
              borderRadius="6px"
            >
              <Box display="flex">
                {/* PROFILE IMAGE */}
                <Box width="75px" height="75px" marginTop="8px">
                  <img
                    alt="profile"
                    src={parseImageUrl(post.profile)}
                    width="75px"
                    height="75px"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/default-avatar.png";
                    }}
                  />
                </Box>

                {/* POST CONTENT */}
                <Box flexGrow={1} marginLeft="20px">
                  <Box display="flex" justifyContent="space-between">
                    <Box fontFamily="DM Serif Display" fontSize="24px">
                      {post.profile?.handle}
                    </Box>
                    <Box height="50px" _hover={{ cursor: "pointer" }}>
                      <Image
                        alt="follow-icon"
                        src="/follow-icon.png"
                        width="50px"
                        height="50px"
                        onClick={() => follow(post.id)}
                      />
                    </Box>
                  </Box>
                  <Box overflowWrap="anywhere" fontSize="14px">
                    {post.metadata?.content}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* FRIEND SUGGESTIONS */}
        <Box
          width="30%"
          backgroundColor="#03444d"
          padding="40px 25px"
          borderRadius="6px"
          height="fit-content"
        >
          <Box fontFamily="DM Serif Display">FRIEND SUGGESTIONS</Box>
          <Box>
            {profiles.map((profile, i) => (
              <Box
                key={profile.id}
                margin="30px 0"
                display="flex"
                alignItems="center"
                height="40px"
                _hover={{ color: "#808080", cursor: "pointer" }}
              >
                <img
                  alt="profile"
                  src={parseImageUrl(profile)}
                  width="40px"
                  height="40px"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/default-avatar.png";
                  }}
                />
                <Box marginLeft="25px">
                  <h4>{profile.name}</h4>
                  <p>{profile.handle}</p>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
