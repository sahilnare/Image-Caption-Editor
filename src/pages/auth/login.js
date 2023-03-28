
import Head from 'next/head';
import SignIn from '../../views/auth/signin';


export default function SignInPage() {

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<SignIn />
		</>
	);
	
}
