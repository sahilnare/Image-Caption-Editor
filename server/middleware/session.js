
import { ironSession } from 'iron-session/express';


const session = ironSession({

	cookieName: 'iron-session/prototype',
	password: process.env.SECRET_COOKIE_PASSWORD,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production'
	}

});


export default session;
