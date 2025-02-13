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
  const [showSignUp, setShowSignUp] = useState(false)

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
          favouritePlant: 0,
          preferredTheme: 'dark',
          version: 0,
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
      } catch (error) {
        console.error('Error adding document:', error)
      }
    }
  }

  // Creates a dummy plant to plot with
  async function setUpDummyPlant(auth: Auth) {
    console.log('Setting up dummy plant')
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      try {
        await setDoc(doc(db, 'userPlants', uid), {
          version: 0,
          plants: [
            {
              name: 'Dummy Plant 1',
              colour: '#000000',
              image: 'someimage.png',
              vitals: {
                moisture: {
                  title: 'Moisture',
                  unit: 'ppm',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      0.43, 0.21, 0.37, 0.29, 0.11, 0.29, 0.1, 0.26, 0.08, 0.14,
                      0.17, 0.22, 0.39, 0.34, 0.37, 0.19, 0.36, 0.26, 0.15,
                      0.27,
                    ],
                  },
                },
                temperature: {
                  title: 'Temperature',
                  unit: 'C',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      27.37, 20.21, 20.79, 28.75, 23.19, 29.94, 29.79, 22.26,
                      25.53, 21.93, 22.5, 27.5, 29.58, 25.18, 27.97, 26.98,
                      28.68, 27.53, 22.31, 21.75,
                    ],
                  },
                },
                pH: {
                  title: 'pH Level',
                  unit: '',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      7.29, 7.34, 6.13, 6.38, 7.0, 7.02, 5.75, 6.23, 7.17, 5.79,
                      5.5, 5.63, 6.6, 6.64, 6.78, 6.21, 7.5, 5.74, 5.8, 6.43,
                    ],
                  },
                },
                e: {
                  title: 'Electrical Conductivity',
                  unit: 'ec',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      0.86, 0.61, 0.57, 0.61, 0.69, 0.83, 0.66, 0.62, 0.95,
                      0.61, 0.84, 0.61, 0.31, 0.86, 0.97, 0.7, 0.8, 0.82, 0.46,
                      0.64,
                    ],
                  },
                },
                npk: {
                  title: 'NPK',
                  unit: '',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      27.86, 29.01, 39.31, 15.88, 38.23, 37.17, 26.92, 13.71,
                      12.02, 32.83, 33.5, 14.44, 15.69, 11.44, 29.64, 35.0,
                      17.47, 16.77, 14.84, 27.44,
                    ],
                  },
                },
              },
            },
            {
              name: 'Dummy Plant 2',
              colour: '#000000',
              image: 'someimage.png',
              vitals: {
                moisture: {
                  title: 'Moisture',
                  unit: 'ppm',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      0.43, 0.21, 0.37, 0.29, 0.11, 0.29, 0.1, 0.26, 0.08, 0.14,
                      0.17, 0.22, 0.39, 0.34, 0.37, 0.19, 0.36, 0.26, 0.15,
                      0.27,
                    ],
                  },
                },
                temperature: {
                  title: 'Temperature',
                  unit: 'C',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      27.37, 20.21, 20.79, 28.75, 23.19, 29.94, 29.79, 22.26,
                      25.53, 21.93, 22.5, 27.5, 29.58, 25.18, 27.97, 26.98,
                      28.68, 27.53, 22.31, 21.75,
                    ],
                  },
                },
                pH: {
                  title: 'pH Level',
                  unit: '',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      7.29, 7.34, 6.13, 6.38, 7.0, 7.02, 5.75, 6.23, 7.17, 5.79,
                      5.5, 5.63, 6.6, 6.64, 6.78, 6.21, 7.5, 5.74, 5.8, 6.43,
                    ],
                  },
                },
                e: {
                  title: 'Electrical Conductivity',
                  unit: 'ec',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      0.86, 0.61, 0.57, 0.61, 0.69, 0.83, 0.66, 0.62, 0.95,
                      0.61, 0.84, 0.61, 0.31, 0.86, 0.97, 0.7, 0.8, 0.82, 0.46,
                      0.64,
                    ],
                  },
                },
                npk: {
                  title: 'NPK',
                  unit: '',
                  version: 0,
                  readings: {
                    time: [
                      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                      75, 80, 85, 90, 95,
                    ],
                    reading: [
                      27.86, 29.01, 39.31, 15.88, 38.23, 37.17, 26.92, 13.71,
                      12.02, 32.83, 33.5, 14.44, 15.69, 11.44, 29.64, 35.0,
                      17.47, 16.77, 14.84, 27.44,
                    ],
                  },
                },
              },
            },
          ],
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
      console.log('error creating user')
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
      {showSignUp ? (
        <LoginPanel>
          <a href="#" onClick={() => signUp()}>
            Sign up
          </a>
        </LoginPanel>
      ) : (
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
            <a href="#" onClick={() => setShowSignUp(true)}>
              Sign up
            </a>
          </FooterText>
        </LoginPanel>
      )}
    </LoginBackground>
  )
}
