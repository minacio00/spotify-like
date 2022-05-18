import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {SessionProvider,getSession} from "next-auth/react";
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={session}>
      {/* {console.log(session, "app")} */}
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp;
// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx)
//     }
//   }
// }
