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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  // Sign up functionality with firebase

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
        await setDoc(
          doc(db, 'userPlants', uid),

          {
            version: 0,
            plants: [
              {
                name: 'Dummy Plant 1',
                dates: ['2025-03-20T00:00:00'],
                colour: '#000000',
                image: 'someimage.png',
                vitals: {
                  moisture: {
                    title: 'Moisture',
                    unit: 'ppm',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 0.44,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 0.71,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 0.768,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 0.885,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 0.032,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 0.017,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 0.338,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 0.856,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 0.91,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 0.489,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 0.102,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 0.086,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 0.462,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 0.06,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 0.526,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 0.966,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 0.897,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 0.538,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 0.685,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 0.103,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 0.157,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 0.459,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 0.212,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 0.199,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 0.133,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 0.239,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 0.059,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 0.734,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 0.42,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 0.526,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 0.548,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 0.329,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 0.932,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 0.776,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 0.933,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 0.011,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 0.426,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 0.176,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 0.429,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 0.537,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 0.889,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 0.842,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 0.328,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 0.057,
                          },
                        ],
                      },
                    ],
                  },
                  temperature: {
                    title: 'Temperature',
                    unit: 'C',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 28.941,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 19.629,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 24.049,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 18.851,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 18.84,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 21.509,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 26.063,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 26.294,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 18.826,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 19.439,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 29.796,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 18.586,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 20.128,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 29.341,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 21.137,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 24.528,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 29.955,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 19.589,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 20.819,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 24.839,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 28.914,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 19.115,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 18.039,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 29.649,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 27.356,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 21.175,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 21.612,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 26.042,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 27.824,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 19.516,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 20.0,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 20.185,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 28.217,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 22.455,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 28.663,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 19.705,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 18.113,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 29.089,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 27.698,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 28.433,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 27.287,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 29.098,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 27.799,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 23.67,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 19.981,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 29.911,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 18.323,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 23.879,
                          },
                        ],
                      },
                    ],
                  },
                  pH: {
                    title: 'pH Level',
                    unit: '',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 5.799,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 6.534,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 7.481,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 5.788,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 6.863,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 6.798,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 5.874,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 5.678,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 6.202,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 5.979,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 6.758,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 6.582,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 6.404,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 5.977,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 5.779,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 6.556,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 7.158,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 5.838,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 6.281,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 6.199,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 6.258,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 6.762,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 6.453,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 6.252,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 7.11,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 6.94,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 6.935,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 6.628,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 7.255,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 7.024,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 5.526,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 6.806,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 6.044,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 7.127,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 6.106,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 5.941,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 6.077,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 7.198,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 7.042,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 7.434,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 6.71,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 6.495,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 6.247,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 6.265,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 7.446,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 7.097,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 5.936,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 6.819,
                          },
                        ],
                      },
                    ],
                  },
                  e: {
                    title: 'Electrical Conductivity',
                    unit: 'ec',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 0.647,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 0.336,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 0.762,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 0.422,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 0.363,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 0.774,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 0.888,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 0.766,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 0.644,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 1.176,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 0.307,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 0.97,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 0.4,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 0.523,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 0.883,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 1.081,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 0.989,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 0.649,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 0.702,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 0.948,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 0.98,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 0.398,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 0.817,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 0.689,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 0.557,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 0.523,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 0.878,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 0.824,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 0.936,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 0.443,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 0.741,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 1.135,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 0.688,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 0.862,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 0.413,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 0.666,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 0.629,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 0.413,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 0.707,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 0.328,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 0.967,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 0.932,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 0.71,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 0.414,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 1.001,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 0.936,
                          },
                        ],
                      },
                    ],
                  },
                  npk: {
                    title: 'NPK',
                    unit: '',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 62.91,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 99.93,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 10.05,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 61.15,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 59.23,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 21.49,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 24.15,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 53.68,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 32.13,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 50.8,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 38.44,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 28.66,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 92.86,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 49.21,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 76.76,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 29.82,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 62.41,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 47.68,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 91.94,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 90.75,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 46.21,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 89.39,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 53.0,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 94.57,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 53.51,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 90.1,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 91.16,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 21.05,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 97.91,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 70.14,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 42.56,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 52.9,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 72.03,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 52.98,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 87.26,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 93.5,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 75.66,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 19.9,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 23.68,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 64.47,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 84.49,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 64.52,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 13.87,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 24.47,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 39.85,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 40.35,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 39.7,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 94.18,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                name: 'Dummy Plant 2',
                dates: ['2025-03-20T00:00:00'],
                colour: '#000000',
                image: 'someimage.png',
                vitals: {
                  moisture: {
                    title: 'Moisture',
                    unit: 'ppm',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 0.44,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 0.71,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 0.768,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 0.885,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 0.032,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 0.017,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 0.338,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 0.856,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 0.91,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 0.489,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 0.102,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 0.086,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 0.462,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 0.06,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 0.526,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 0.966,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 0.897,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 0.538,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 0.685,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 0.103,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 0.157,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 0.459,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 0.212,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 0.199,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 0.133,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 0.239,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 0.059,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 0.734,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 0.42,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 0.526,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 0.548,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 0.329,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 0.932,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 0.776,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 0.933,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 0.011,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 0.426,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 0.176,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 0.605,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 0.429,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 0.537,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 0.889,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 0.842,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 0.328,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 0.057,
                          },
                        ],
                      },
                    ],
                  },
                  temperature: {
                    title: 'Temperature',
                    unit: 'C',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 28.941,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 19.629,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 24.049,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 18.851,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 18.84,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 21.509,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 26.063,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 26.294,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 18.826,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 19.439,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 29.796,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 18.586,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 20.128,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 29.341,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 21.137,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 24.528,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 29.955,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 19.589,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 20.819,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 24.839,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 28.914,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 19.115,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 18.039,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 29.649,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 27.356,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 21.175,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 21.612,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 26.042,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 27.824,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 19.516,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 20.0,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 20.185,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 28.217,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 22.455,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 28.663,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 19.705,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 18.113,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 29.089,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 27.698,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 28.433,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 27.287,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 29.098,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 27.799,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 23.67,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 19.981,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 29.911,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 18.323,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 23.879,
                          },
                        ],
                      },
                    ],
                  },
                  pH: {
                    title: 'pH Level',
                    unit: '',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 5.799,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 6.534,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 7.481,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 5.788,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 6.863,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 6.798,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 5.874,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 5.678,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 6.202,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 5.979,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 6.758,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 6.582,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 6.404,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 5.977,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 5.779,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 6.556,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 7.158,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 5.838,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 6.281,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 6.199,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 6.258,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 6.762,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 6.453,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 6.252,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 7.11,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 6.94,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 6.935,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 6.628,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 7.255,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 7.024,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 5.526,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 6.806,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 6.044,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 7.127,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 6.106,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 5.941,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 6.077,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 7.198,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 7.042,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 7.434,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 6.71,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 6.495,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 6.247,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 6.265,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 7.446,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 7.097,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 5.936,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 6.819,
                          },
                        ],
                      },
                    ],
                  },
                  e: {
                    title: 'Electrical Conductivity',
                    unit: 'ec',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 0.647,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 0.336,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 0.762,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 0.422,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 0.363,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 0.774,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 0.888,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 0.766,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 0.644,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 1.176,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 0.307,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 0.97,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 0.4,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 0.523,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 0.883,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 1.081,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 0.989,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 0.649,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 0.702,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 0.948,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 0.98,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 0.398,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 0.817,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 0.689,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 0.557,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 0.523,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 0.878,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 0.824,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 0.936,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 0.549,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 0.443,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 0.741,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 1.135,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 0.688,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 0.862,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 0.413,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 0.666,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 0.629,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 0.413,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 0.707,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 0.328,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 0.967,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 0.932,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 0.71,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 0.414,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 1.001,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 0.936,
                          },
                        ],
                      },
                    ],
                  },
                  npk: {
                    title: 'NPK',
                    unit: '',
                    version: 0,
                    readings: [
                      {
                        data: [
                          {
                            name: '2025-03-20T00:00:00',
                            value: 62.91,
                          },
                          {
                            name: '2025-03-20T00:30:00',
                            value: 99.93,
                          },
                          {
                            name: '2025-03-20T01:00:00',
                            value: 10.05,
                          },
                          {
                            name: '2025-03-20T01:30:00',
                            value: 61.15,
                          },
                          {
                            name: '2025-03-20T02:00:00',
                            value: 59.23,
                          },
                          {
                            name: '2025-03-20T02:30:00',
                            value: 21.49,
                          },
                          {
                            name: '2025-03-20T03:00:00',
                            value: 24.15,
                          },
                          {
                            name: '2025-03-20T03:30:00',
                            value: 53.68,
                          },
                          {
                            name: '2025-03-20T04:00:00',
                            value: 32.13,
                          },
                          {
                            name: '2025-03-20T04:30:00',
                            value: 50.8,
                          },
                          {
                            name: '2025-03-20T05:00:00',
                            value: 38.44,
                          },
                          {
                            name: '2025-03-20T05:30:00',
                            value: 28.66,
                          },
                          {
                            name: '2025-03-20T06:00:00',
                            value: 92.86,
                          },
                          {
                            name: '2025-03-20T06:30:00',
                            value: 49.21,
                          },
                          {
                            name: '2025-03-20T07:00:00',
                            value: 76.76,
                          },
                          {
                            name: '2025-03-20T07:30:00',
                            value: 29.82,
                          },
                          {
                            name: '2025-03-20T08:00:00',
                            value: 62.41,
                          },
                          {
                            name: '2025-03-20T08:30:00',
                            value: 47.68,
                          },
                          {
                            name: '2025-03-20T09:00:00',
                            value: 91.94,
                          },
                          {
                            name: '2025-03-20T09:30:00',
                            value: 90.75,
                          },
                          {
                            name: '2025-03-20T10:00:00',
                            value: 46.21,
                          },
                          {
                            name: '2025-03-20T10:30:00',
                            value: 89.39,
                          },
                          {
                            name: '2025-03-20T11:00:00',
                            value: 53.0,
                          },
                          {
                            name: '2025-03-20T11:30:00',
                            value: 94.57,
                          },
                          {
                            name: '2025-03-20T12:00:00',
                            value: 53.51,
                          },
                          {
                            name: '2025-03-20T12:30:00',
                            value: 90.1,
                          },
                          {
                            name: '2025-03-20T13:00:00',
                            value: 91.16,
                          },
                          {
                            name: '2025-03-20T13:30:00',
                            value: 21.05,
                          },
                          {
                            name: '2025-03-20T14:00:00',
                            value: 97.91,
                          },
                          {
                            name: '2025-03-20T14:30:00',
                            value: 70.14,
                          },
                          {
                            name: '2025-03-20T15:00:00',
                            value: 42.56,
                          },
                          {
                            name: '2025-03-20T15:30:00',
                            value: 52.9,
                          },
                          {
                            name: '2025-03-20T16:00:00',
                            value: 72.03,
                          },
                          {
                            name: '2025-03-20T16:30:00',
                            value: 52.98,
                          },
                          {
                            name: '2025-03-20T17:00:00',
                            value: 87.26,
                          },
                          {
                            name: '2025-03-20T17:30:00',
                            value: 93.5,
                          },
                          {
                            name: '2025-03-20T18:00:00',
                            value: 75.66,
                          },
                          {
                            name: '2025-03-20T18:30:00',
                            value: 19.9,
                          },
                          {
                            name: '2025-03-20T19:00:00',
                            value: 23.68,
                          },
                          {
                            name: '2025-03-20T19:30:00',
                            value: 64.47,
                          },
                          {
                            name: '2025-03-20T20:00:00',
                            value: 84.49,
                          },
                          {
                            name: '2025-03-20T20:30:00',
                            value: 64.52,
                          },
                          {
                            name: '2025-03-20T21:00:00',
                            value: 13.87,
                          },
                          {
                            name: '2025-03-20T21:30:00',
                            value: 24.47,
                          },
                          {
                            name: '2025-03-20T22:00:00',
                            value: 39.85,
                          },
                          {
                            name: '2025-03-20T22:30:00',
                            value: 40.35,
                          },
                          {
                            name: '2025-03-20T23:00:00',
                            value: 39.7,
                          },
                          {
                            name: '2025-03-20T23:30:00',
                            value: 94.18,
                          },
                        ],
                      },
                    ],
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
          <Title>Sign Up</Title>
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
          <Button isLoading={isLoading} onClick={() => signUp()}>
            {isLoading ? <LoadingSpinner /> : 'Sign up'}
          </Button>
          <DividerLine />
          <FooterText>
            <a href="#" onClick={() => setShowSignUp(false)}>
              Back to sign in
            </a>
          </FooterText>
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
