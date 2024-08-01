import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDV-BwscOq2bLQ9F_jzYmi47MVp-HAbVBI',
	authDomain: 'zubovdns-modsen-twitter.firebaseapp.com',
	projectId: 'zubovdns-modsen-twitter',
	storageBucket: 'zubovdns-modsen-twitter.appspot.com',
	messagingSenderId: '968948894793',
	appId: '1:968948894793:web:f70f32fee85999c2b68398',
	measurementId: 'G-NZZ2347W3D',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
