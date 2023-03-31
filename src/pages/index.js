import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Image Caption Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
		<div>
			<a href='/admin/editor' style={{fontSize: '40px', marginBottom: '20px'}}>Click here to open the editor</a>
		</div>
		
		<div>
			<a href='/admin/check' style={{fontSize: '40px'}}>Click here to check and delete</a>
		</div>
		
      </main>
    </>
  )
}
