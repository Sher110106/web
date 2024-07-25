'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  password: string
  token: string
}

const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to /account with success message in URL
        router.push('/account?success=Password reset successfully.')
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  useEffect(() => {
    reset({ token: token || '' })
  }, [reset, token])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <Input
        name="password"
        type="password"
        label="New Password"
        required
        register={register}
        error={errors.password}
      />
      <input type="hidden" {...register('token')} />
      <Button
        type="submit"
        appearance="primary"
        label="Reset Password"
        className={classes.submit}
      />
    </form>
  )
}

export default function ResetPasswordFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
