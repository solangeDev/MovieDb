import Head from 'next/head'
import LoginView from '../containers/LoginView'

function Home(props) {
  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="text / html; charset = utf-8" />
        {/* agregar metadadata descripción */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Moviedb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginView/>
    </div>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
//   const data = {}

//   // Pass data to the page via props
//   return { props: { data } }
// }

export default Home
