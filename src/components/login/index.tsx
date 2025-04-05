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
import { getUserData } from '@/helpers/firebase'

export default function LoginPane(props: any) {
  const { isLoggedIn, setLoggedIn, database } = props
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  // Sign up functionality with firebase
  function swapToSignInSignUp(showSignUp: boolean) {
    // Swap all values to the other set of input boxes
    if (showSignUp === true) {
    }
  }
  async function setupUser(
    auth: Auth,
    email: string,
    firstName: string,
    lastName: string
  ) {
    console.log('Setting up user')
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      try {
        await setDoc(doc(db, 'users', uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          numPlants: 0,
          favouritePlant: 0,
          preferredTheme: 'dark',
          version: 0,
          notifications: [
            {
              name: 'Notification Name',
              message: 'Notifications will apear here',
              details: 'Reason',
              time: 'Time',
              image: '',
              colour: '#44C7AF', // Keppel
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
        await setDoc(
          doc(db, 'userPlants', uid),

          {
            version: 0,
            plants: [
              {
                name: 'Dummy Plant 1',
                dates: [],
                colour: '#000000',
                image: '',
                vitals: {
                  moisture: {
                    title: 'Moisture',
                    unit: 'ppm',
                    version: 0,
                    readings: [],
                  },
                  temperature: {
                    title: 'Temperature',
                    unit: 'C',
                    version: 0,
                    readings: [],
                  },
                  pH: {
                    title: 'pH Level',
                    unit: '',
                    version: 0,
                    readings: [],
                  },
                  e: {
                    title: 'Electrical Conductivity',
                    unit: 'ec',
                    version: 0,
                    readings: [],
                  },
                  npk: {
                    title: 'NPK',
                    unit: '',
                    version: 0,
                    readings: [],
                  },
                },
              },
              {
                name: 'Dummy Plant 2',
                dates: [],
                colour: '#000000',
                image: '',
                vitals: {
                  moisture: {
                    title: 'Moisture',
                    unit: 'ppm',
                    version: 0,
                    readings: [],
                  },
                  temperature: {
                    title: 'Temperature',
                    unit: 'C',
                    version: 0,
                    readings: [],
                  },
                  pH: {
                    title: 'pH Level',
                    unit: '',
                    version: 0,
                    readings: [],
                  },
                  e: {
                    title: 'Electrical Conductivity',
                    unit: 'ec',
                    version: 0,
                    readings: [],
                  },
                  npk: {
                    title: 'NPK',
                    unit: '',
                    version: 0,
                    readings: [],
                  },
                },
              },
            ],
          }
        )
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
        await setupUser(auth, email, firstName, lastName)

        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 300)) // wait 300ms before next try
          const user = await getUserData(db, auth, 'users')
          if (user?.notifications) {
            console.log('[x] breaking', user?.notifications)
            break
          }
          console.log('[x]  undefined', user?.notifications)
        }

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
      <LoginPanel>
        <Title>{showSignUp ? 'Sign Up' : 'Sign In'}</Title>

        {showSignUp && (
          <>
            <Label>First Name</Label>
            <Input
              type="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <Label>Last Name</Label>
            <Input
              type="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </>
        )}
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

        {showSignUp ? (
          <>
            <Button isLoading={isLoading} onClick={() => signUp()}>
              {isLoading ? <LoadingSpinner /> : 'Sign up'}
            </Button>
            <DividerLine />
            <FooterText>
              <a href="#" onClick={() => setShowSignUp(false)}>
                Back to sign in
              </a>
            </FooterText>
          </>
        ) : (
          <>
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
          </>
        )}
      </LoginPanel>
    </LoginBackground>
  )
}
