import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import isEmail from '../../../hooks/util/isEmail'
import { Card, CardTitle } from '../../common/Card'
import { Button, Input, InputWrapper } from '../../common/Input'
import { Link } from '../../common/Typography'

const InputAndError = tw.div`
  flex flex-col
`

const SignUpInputWrapper = tw(InputWrapper)`
  flex flex-row my-3
`

const ErrorMessage = styled.div(({ show }) => [
  tw`
    text-red-500 text-xs h-4 opacity-0 transition-opacity
  `,
  show && tw`opacity-100`
])

const Instagram = tw.div`
  text-sm
`

export default function SignUp(props) {
  const [email, _setEmail] = useState('')
  const [error, setError] = useState(false)

  const setEmail = (email) => {
    setError(false)
    _setEmail(email)
  }
  
  const submit = () => {console.log(`${email} submitted`)}

  return (
    <Card>
      <CardTitle>Don't miss a beat.</CardTitle>
      Join the newsletter and get an email when a new review is published!
      <InputAndError>
        <SignUpInputWrapper>
          <Input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='you@email.com'
            onEnter={() => isEmail(email) ? submit() : setError(true)}
            $error={error ? 'true' : undefined}
            continuous
          />
          <Button disabled={!isEmail(email)} onClick={submit} continuous>Sign up!</Button>
        </SignUpInputWrapper>
        <ErrorMessage show={error  ? 'true' : undefined}>
          This is not a valid email.
        </ErrorMessage>
      </InputAndError>
      <Instagram>
        Or if that's not your thing, <Link as='a' target='_blank' href={'https://instagram.com/progressivereview'}>follow me on Instagram.</Link> 
      </Instagram>
    </Card>
  )
}
