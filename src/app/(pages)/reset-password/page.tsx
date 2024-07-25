import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import ResetPasswordFormWrapper from './ResetPasswordForm'

import classes from './index.module.scss'

// Since ResetPassword is a server component, it should not use async functions directly.
// If you need to handle async logic, it should be within the client component or using server-side methods.
export default function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordFormWrapper />
    </Gutter>
  )
}

// Metadata for the page
export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Enter a new password.',
  openGraph: mergeOpenGraph({
    title: 'Reset Password',
    url: '/reset-password',
  }),
}
