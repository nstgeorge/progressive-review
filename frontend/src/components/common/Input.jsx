import React from 'react';
import { css } from 'styled-components';
import tw, { styled, theme } from "twin.macro";
import continuousStyles from './styles/continuousStyles';

export const InputWrapper = styled.div(({ continuous }) => [
  tw`w-full contents`,
  continuous && continuousStyles
])

const inputStyles = tw`
  px-3 py-2 my-3 text-sm md:text-base
  rounded-md w-full transition-all
  ring ring-indigo-500 ring-opacity-0
  dark:(
    bg-neutral-800 border-neutral-700
    placeholder:text-neutral-500
  )
  focus:border-indigo-300! focus:ring-opacity-100! focus:outline-none
`

const errorStyles = tw`
  border-red-500! focus:border-red-500! ring-red-400!
`

const largeStyles = tw`text-lg`

const _StyledInput = styled.input(({ $large, $error, continuous }) => [
  inputStyles,
  $large && largeStyles,
  $error && errorStyles,
  continuous && continuousStyles
])

export const StyledSelect = styled.select(({ $large, $error, continuous }) => [
  tw`cursor-pointer`,
  inputStyles,
  $large && largeStyles,
  $error && errorStyles,
  continuous && continuousStyles
])

export const StyledTextarea = styled.textarea(({ $large, $error, continuous }) => [
  inputStyles,
  $large && largeStyles,
  $error && errorStyles,
  continuous && continuousStyles
])

export const HiddenInput = tw.input`
  hidden
`

export const Input = React.forwardRef(({ onEnter, onKeyDown, ...others }, ref) => {
  const handleKey = (e) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e)
    } else if (onKeyDown) {
      onKeyDown(e)
    }
  }

  if (others.continuous) {
    return (<_StyledInput {...(onEnter || onKeyDown ? { onKeyDown: (e) => handleKey(e) } : {})} ref={ref} {...others} />)
  } else {
    return (
      <InputWrapper>
        <_StyledInput {...(onEnter || onKeyDown ? { onKeyDown: (e) => handleKey(e) } : {})} ref={ref} {...others} />
      </InputWrapper>
    )
  }
})

// Buttons --------------------------------------------------

const disabledStyles = `
  pointer-events-none shadow-none
  bg-opacity-100 bg-gradient-to-tr!
  border-neutral-300!
  from-neutral-400 to-neutral-300 text-neutral-500
  dark:(
    from-neutral-700 to-neutral-600 text-neutral-400!
  )
`

export const Button = styled.button(({ disabled, continuous }) => [
  tw`
    rounded text-sm shrink-0
    bg-gradient-to-tr
    from-indigo-700 to-indigo-500
    px-4 py-3 text-white w-max
    transition-all
    select-none
    outline-indigo-400
    focus:(outline-none ring ring-indigo-200)
    disabled:(${disabledStyles})
  `,
  css`
    &:hover {
      box-shadow: 0 0px 40px -5px ${theme`colors.indigo[600]`};
      outline: solid;
      outline-color: ${theme`colors.indigo[400]`};
    } 
  `,
  continuous && continuousStyles,
  disabled && disabledStyles
])