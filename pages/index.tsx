import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import Center from "../components/Center";
import Player from "../components/Player"
import { useSession,getSession } from 'next-auth/react';


const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
          <Sidebar/>
        <Center/>
      </main>  
      <div className='sticky bottom-0'>
        <Player/>
      </div>
    </div>
  )
}
export default Home
export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
