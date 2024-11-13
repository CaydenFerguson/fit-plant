import NormalPageLayout from '@/components/normalPageLayout'
import Test from '@/components/testComp'
import React from 'react'

export default function pragya() {
  let answer = 5 * 5

  let answers = {
    one: 5,
    two: 5,
    three: 'hi im a string',
    four: {
      one: 'hi',
    },
  }

  return (
    <>
      <p></p>
      <NormalPageLayout>
        <ul>
          <li>The next LI is the answer</li>
          <li>{answer}</li>
          <li>Hi</li>
          <li></li>
          <li></li>
        </ul>
        <Test name="hello" value={5} percentage={0.05} />
        Hi Im Pragyas page
      </NormalPageLayout>
    </>
  )
}
