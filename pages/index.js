import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section';
import NavBar from '../components/NavBar';
import Link from 'next/link';
import Image from 'next/Image';
import insekter from '../public/insekter.jpg'
import djur from '../public/djur.jpg'
import natur from '../public/natur.jpg'

export const getStaticProps = async () => {

  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })


const videosQuery = gql`
query {
  videos {
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
    thumbnail {
      url
    },
    mp4 {
      url
    }
  }
  }
`

const accountQuery = gql`
query {
  account(where: { id: "cl21q0kp79i4j0btcnl3zr8ju"}) {
    username
    avatar {
      url
    }
  }
}
`

const data = await graphQLClient.request(videosQuery)
const videos = data.videos
const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account

return {
  props: {
    videos,
    account
  }
}
}

const Home = ({ videos, account }) => {
  
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

const filterVideos = (videos,genre) => {
  return videos.filter((video) => video.tags.includes(genre))
}

const unSeenVideos = (videos) => {
  return videos.filter(video => video.seen == false || video.seen == null)
}


  return (
   <>
   <NavBar account={account}/>

     <div className='main-video'>
        <img src={ randomVideo(videos).thumbnail.url}
        alt={randomVideo(videos).title}/>
      </div>
     
     <div className='app'>

      
      <h3 className='storaKategorierHeader' >Kategorier</h3>
      <div className='video-feed'>
      <Link href='#insekter'><div className='kategori' id='insekter'>{/* <Image src={insekter}/> */}Insekter</div></Link>

      <Link href='#djur'><div className='kategori' id='djur'>{/* <Image src={djur}/> */}Däggdjur</div></Link>

      <Link href='#natur'><div className='kategori' id='natur'>{/* <Image src={natur}/> */}Natur</div></Link>
      </div>  

        <Section genre={'Rekommenderat för dig'} videos={unSeenVideos(videos)}/>
        
        <Section id='insekter' genre={'Insekter'} videos={filterVideos(videos, 'bi')}/>
        <Section id='djur' genre={'Sommar'} videos={filterVideos(videos, 'sommar')}/>
        <Section id='natur' genre={'Regn'} videos={filterVideos(videos, 'regn')}/>
        
      
     </div>

      

   </>
  )
}

export default Home