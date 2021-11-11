import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

import { Winner } from '../hooks/useGame';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyCCikWSbZncEBCCulUNaaHyCQFOZ59kPHM',
	authDomain: 'pv247-tick-tack-toe.firebaseapp.com',
	projectId: 'pv247-tick-tack-toe',
	storageBucket: 'pv247-tick-tack-toe.appspot.com',
	messagingSenderId: '944764029670',
	appId: '1:944764029670:web:28dfad52c5159152298927',
	measurementId: 'G-GBMMCDMZX3'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Reviews collection
export type Review = {
	by: string;
	stars: number;
	description?: string;
};

export const reviewsCollection = collection(
	db,
	'reviews'
) as CollectionReference<Review>;

export const reviewsDocument = (id: string) =>
	doc(db, 'reviews', id) as DocumentReference<Review>;

// Matches collection
export type Match = {
	by: string;
	winner: Winner;
	date: Timestamp;
};

export const matchesCollection = collection(
	db,
	'matches'
) as CollectionReference<Match>;
