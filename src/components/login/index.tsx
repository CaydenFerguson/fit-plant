import React, { useEffect, useState } from 'react'
import {
  LoginBackground,
  LoginPanel,
  Title,
  Input,
  Button,
  Label,
  FooterText,
  DividerLine,
  Msg,
} from './style'

import { auth } from '../../config/firebase'
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import LoadingSpinner from '../loadingSpinner'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export default function LoginPane({ isLoggedIn, setLoggedIn, database }: any) {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sign up functionality with firebase

  async function setupUser(auth: Auth, email: string) {
    console.log('Setting up user')
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      try {
        await setDoc(doc(db, 'users', uid), {
          name: '',
          email: email,
          numPlants: 0,
          plants: {},
          notifications: [
            {
              name: 'Tomatoes',
              message: 'Pest Detected',
              details: 'Aphids',
              time: '10 minutes ago',
              image: 'https://example.com/images/tomatoes.png',
              colour: '#44C7AF', // Keppel
            },
            {
              name: 'Daisy',
              message: 'Needs Water',
              details: '5ppm',
              time: '2 hours ago',
              image: 'https://example.com/images/daisy.png',
              colour: '#2A7C6D', // Pine Green
            },
            {
              name: 'Beans',
              message: 'Ready for Harvest',
              details: '7 days remaining',
              time: '5 hours ago',
              image: 'https://example.com/images/beans.png',
              colour: '#3EB59F', // Keppel
            },
            {
              name: 'Cactus',
              message: 'Too Much Sunlight',
              details: '12 hours',
              time: '1 day ago',
              image: 'https://example.com/images/cactus.png',
              colour: '#2E8878', // Viridian
            },
            {
              name: 'Sunflower',
              message: 'Low Nutrients',
              details: 'NPK 3-1-2',
              time: '3 days ago',
              image: 'https://example.com/images/sunflower.png',
              colour: '#339684', // Persian Green
            },
            {
              name: 'Basil',
              message: 'Fungal Infection Detected',
              details: 'Powdery mildew',
              time: '5 days ago',
              image: 'https://example.com/images/basil.png',
              colour: '#38A591', // Zomp
            },
            {
              name: 'Rosemary',
              message: 'Dry Soil',
              details: 'Moisture level: 15%',
              time: '1 week ago',
              image: 'https://example.com/images/rosemary.png',
              colour: '#2A7C6D', // Pine Green
            },
            {
              name: 'Lavender',
              message: 'Needs Repotting',
              details: 'Root-bound',
              time: '2 weeks ago',
              image: 'https://example.com/images/lavender.png',
              colour: '#2E8878', // Viridian
            },
          ],
        })

        await setDoc(doc(db, 'userPlants', uid), {
          0: {
            moisture: {
              unit: 'ppm',
              version: 0,
              readings: [
                { time: 0, reading: 0.43 },
                { time: 5, reading: 0.21 },
                { time: 10, reading: 0.37 },
                { time: 15, reading: 0.29 },
                { time: 20, reading: 0.11 },
                { time: 25, reading: 0.29 },
                { time: 30, reading: 0.1 },
                { time: 35, reading: 0.26 },
                { time: 40, reading: 0.08 },
                { time: 45, reading: 0.14 },
                { time: 50, reading: 0.17 },
                { time: 55, reading: 0.22 },
                { time: 60, reading: 0.39 },
                { time: 65, reading: 0.34 },
                { time: 70, reading: 0.37 },
                { time: 75, reading: 0.19 },
                { time: 80, reading: 0.36 },
                { time: 85, reading: 0.26 },
                { time: 90, reading: 0.15 },
                { time: 95, reading: 0.27 },
              ],
            },
            temperature: {
              unit: 'C',
              version: 0,
              readings: [
                { time: 0, reading: 27.37 },
                { time: 5, reading: 20.21 },
                { time: 10, reading: 20.79 },
                { time: 15, reading: 28.75 },
                { time: 20, reading: 23.19 },
                { time: 25, reading: 29.94 },
                { time: 30, reading: 29.79 },
                { time: 35, reading: 22.26 },
                { time: 40, reading: 25.53 },
                { time: 45, reading: 21.93 },
                { time: 50, reading: 22.5 },
                { time: 55, reading: 27.5 },
                { time: 60, reading: 29.58 },
                { time: 65, reading: 25.18 },
                { time: 70, reading: 27.97 },
                { time: 75, reading: 26.98 },
                { time: 80, reading: 28.68 },
                { time: 85, reading: 27.53 },
                { time: 90, reading: 22.31 },
                { time: 95, reading: 21.75 },
              ],
            },
            pH: {
              unit: '',
              version: 0,
              readings: [
                { time: 0, reading: 7.29 },
                { time: 5, reading: 7.34 },
                { time: 10, reading: 6.13 },
                { time: 15, reading: 6.38 },
                { time: 20, reading: 7.0 },
                { time: 25, reading: 7.02 },
                { time: 30, reading: 5.75 },
                { time: 35, reading: 6.23 },
                { time: 40, reading: 7.17 },
                { time: 45, reading: 5.79 },
                { time: 50, reading: 5.5 },
                { time: 55, reading: 5.63 },
                { time: 60, reading: 6.6 },
                { time: 65, reading: 6.64 },
                { time: 70, reading: 6.78 },
                { time: 75, reading: 6.21 },
                { time: 80, reading: 7.5 },
                { time: 85, reading: 5.74 },
                { time: 90, reading: 5.8 },
                { time: 95, reading: 6.43 },
              ],
            },
            e: {
              unit: 'ec',
              version: 0,
              readings: [
                { time: 0, reading: 0.86 },
                { time: 5, reading: 0.61 },
                { time: 10, reading: 0.57 },
                { time: 15, reading: 0.61 },
                { time: 20, reading: 0.69 },
                { time: 25, reading: 0.83 },
                { time: 30, reading: 0.66 },
                { time: 35, reading: 0.62 },
                { time: 40, reading: 0.95 },
                { time: 45, reading: 0.61 },
                { time: 50, reading: 0.84 },
                { time: 55, reading: 0.61 },
                { time: 60, reading: 0.31 },
                { time: 65, reading: 0.86 },
                { time: 70, reading: 0.97 },
                { time: 75, reading: 0.7 },
                { time: 80, reading: 0.8 },
                { time: 85, reading: 0.82 },
                { time: 90, reading: 0.46 },
                { time: 95, reading: 0.64 },
              ],
            },
            npk: {
              unit: '',
              version: 0,
              readings: [
                { time: 0, reading: 27.86 },
                { time: 5, reading: 29.01 },
                { time: 10, reading: 39.31 },
                { time: 15, reading: 15.88 },
                { time: 20, reading: 38.23 },
                { time: 25, reading: 37.17 },
                { time: 30, reading: 26.92 },
                { time: 35, reading: 13.71 },
                { time: 40, reading: 12.02 },
                { time: 45, reading: 32.83 },
                { time: 50, reading: 33.5 },
                { time: 55, reading: 14.44 },
                { time: 60, reading: 15.69 },
                { time: 65, reading: 11.44 },
                { time: 70, reading: 29.64 },
                { time: 75, reading: 35.0 },
                { time: 80, reading: 17.47 },
                { time: 85, reading: 16.77 },
                { time: 90, reading: 14.84 },
                { time: 95, reading: 27.44 },
              ],
            },
          },
        })
      } catch (error) {
        console.error('Error adding document:', error)
      }
    }
  }

  async function setUpDummyPlant(auth: Auth) {
    console.log('Setting up dummy plant')
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      try {
        await setDoc(doc(db, 'userPlants', uid), {
          0: {
            moisture: {
              unit: 'ppm',
              version: 0,
              readings: [
                { time: 0, reading: 0.43 },
                { time: 5, reading: 0.21 },
                { time: 10, reading: 0.37 },
                { time: 15, reading: 0.29 },
                { time: 20, reading: 0.11 },
                { time: 25, reading: 0.29 },
                { time: 30, reading: 0.1 },
                { time: 35, reading: 0.26 },
                { time: 40, reading: 0.08 },
                { time: 45, reading: 0.14 },
                { time: 50, reading: 0.17 },
                { time: 55, reading: 0.22 },
                { time: 60, reading: 0.39 },
                { time: 65, reading: 0.34 },
                { time: 70, reading: 0.37 },
                { time: 75, reading: 0.19 },
                { time: 80, reading: 0.36 },
                { time: 85, reading: 0.26 },
                { time: 90, reading: 0.15 },
                { time: 95, reading: 0.27 },
              ],
            },
            temperature: {
              unit: 'C',
              version: 0,
              readings: [
                { time: 0, reading: 27.37 },
                { time: 5, reading: 20.21 },
                { time: 10, reading: 20.79 },
                { time: 15, reading: 28.75 },
                { time: 20, reading: 23.19 },
                { time: 25, reading: 29.94 },
                { time: 30, reading: 29.79 },
                { time: 35, reading: 22.26 },
                { time: 40, reading: 25.53 },
                { time: 45, reading: 21.93 },
                { time: 50, reading: 22.5 },
                { time: 55, reading: 27.5 },
                { time: 60, reading: 29.58 },
                { time: 65, reading: 25.18 },
                { time: 70, reading: 27.97 },
                { time: 75, reading: 26.98 },
                { time: 80, reading: 28.68 },
                { time: 85, reading: 27.53 },
                { time: 90, reading: 22.31 },
                { time: 95, reading: 21.75 },
              ],
            },
            pH: {
              unit: '',
              version: 0,
              readings: [
                { time: 0, reading: 7.29 },
                { time: 5, reading: 7.34 },
                { time: 10, reading: 6.13 },
                { time: 15, reading: 6.38 },
                { time: 20, reading: 7.0 },
                { time: 25, reading: 7.02 },
                { time: 30, reading: 5.75 },
                { time: 35, reading: 6.23 },
                { time: 40, reading: 7.17 },
                { time: 45, reading: 5.79 },
                { time: 50, reading: 5.5 },
                { time: 55, reading: 5.63 },
                { time: 60, reading: 6.6 },
                { time: 65, reading: 6.64 },
                { time: 70, reading: 6.78 },
                { time: 75, reading: 6.21 },
                { time: 80, reading: 7.5 },
                { time: 85, reading: 5.74 },
                { time: 90, reading: 5.8 },
                { time: 95, reading: 6.43 },
              ],
            },
            e: {
              unit: 'ec',
              version: 0,
              readings: [
                { time: 0, reading: 0.86 },
                { time: 5, reading: 0.61 },
                { time: 10, reading: 0.57 },
                { time: 15, reading: 0.61 },
                { time: 20, reading: 0.69 },
                { time: 25, reading: 0.83 },
                { time: 30, reading: 0.66 },
                { time: 35, reading: 0.62 },
                { time: 40, reading: 0.95 },
                { time: 45, reading: 0.61 },
                { time: 50, reading: 0.84 },
                { time: 55, reading: 0.61 },
                { time: 60, reading: 0.31 },
                { time: 65, reading: 0.86 },
                { time: 70, reading: 0.97 },
                { time: 75, reading: 0.7 },
                { time: 80, reading: 0.8 },
                { time: 85, reading: 0.82 },
                { time: 90, reading: 0.46 },
                { time: 95, reading: 0.64 },
              ],
            },
            npk: {
              unit: '',
              version: 0,
              readings: [
                { time: 0, reading: 27.86 },
                { time: 5, reading: 29.01 },
                { time: 10, reading: 39.31 },
                { time: 15, reading: 15.88 },
                { time: 20, reading: 38.23 },
                { time: 25, reading: 37.17 },
                { time: 30, reading: 26.92 },
                { time: 35, reading: 13.71 },
                { time: 40, reading: 12.02 },
                { time: 45, reading: 32.83 },
                { time: 50, reading: 33.5 },
                { time: 55, reading: 14.44 },
                { time: 60, reading: 15.69 },
                { time: 65, reading: 11.44 },
                { time: 70, reading: 29.64 },
                { time: 75, reading: 35.0 },
                { time: 80, reading: 17.47 },
                { time: 85, reading: 16.77 },
                { time: 90, reading: 14.84 },
                { time: 95, reading: 27.44 },
              ],
            },
          },
        })
      } catch (error) {
        console.error('Error adding document:', error)
      }
    }
  }

  async function signUp() {
    setIsLoading(true)
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (auth.currentUser?.email) {
        await setUpDummyPlant(auth)
        await setupUser(auth, email)
        setLoggedIn(true)
      }
    } catch (error) {
      console.error(error)

      // console.error('Error signing in:', error.message);
      //   if (error.code === 'auth/user-not-found') {
      //       console.error('No user found with this email.');
      //   } else if (error.code === 'auth/wrong-password') {
      //       console.error('Incorrect password.');
      //   } else {
      //       console.error('Something went wrong:', error.message);
      //   }
    }
    setIsLoading(false)
  }

  // Sign in functionality with firebase
  async function signIn() {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (auth.currentUser?.email) {
        setLoggedIn(true)
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        // console.error(error)
        // Handle specific error codes
        switch (error.code) {
          case 'auth/network-request-failed':
            setError(
              'Network error. Please check your internet connection and try again.'
            )
            break
          case 'auth/invalid-credential':
            setError('Invalid Email or Password. Please try again.')
            break
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Please try again later.')
            break
          default:
            setError('Something went wrong. Please try again later.')
        }
      }
    }
    setIsLoading(false)
  }

  return (
    <LoginBackground>
      <LoginPanel>
        <Title>Sign In</Title>
        <Label>Email</Label>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Label>Password</Label>
        <Input
          type="password"
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        {error != '' && <Msg>{error}</Msg>}
        <Button isLoading={isLoading} onClick={() => signIn()}>
          {isLoading ? <LoadingSpinner /> : 'Sign in'}
        </Button>
        <DividerLine />
        <FooterText>
          Need an Account?{' '}
          <a href="#" onClick={() => signUp()}>
            Sign up
          </a>
        </FooterText>
      </LoginPanel>
    </LoginBackground>
  )
}
