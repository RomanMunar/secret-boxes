import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { PrimaryButton } from '../common/PrimaryButton'

export interface MailingListSignupBannerFormValues {
  name: string
  email: string
  agreeToRecieve?: boolean
}
export type SignUpResponse = 'failed' | 'success'
const mailingListSchema: yup.SchemaOf<MailingListSignupBannerFormValues> = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Must be a valid email'),
    agreeToRecieve: yup.boolean(),
  })

export const MailingListSignupBanner: React.FC<{
  onSubmit: (values: MailingListSignupBannerFormValues) => void
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MailingListSignupBannerFormValues>({
    resolver: yupResolver(mailingListSchema),
  })

  return (
    <section className="flex flex-row items-center justify-between">
      <div className="w-[387px] h-[355px]">
        <Image width="387px" height="355px" src="/images/secret-boxes_alien_gray.png" />
      </div>
      <div>
        <h2 className="mb-2 text-6xl font-display dark:text-primary">
          Signup for the Mailing List
        </h2>
        <p className="mb-6 tracking-tight text-gray-body dark:text-dark-body">
          Sign up today to be on the Secret Boxes mailing list. We’ll let you know about
          new
          <br />
          boxes, coming launches and other developments in the Secret Network universe.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start mb-4 space-x-2 ">
            <label htmlFor="email">
              <span data-testid="email-label" className="block mb-3 sr-only">
                Email
              </span>
              <input
                data-testid="email-field"
                type="email"
                className={clsx(
                  errors.email?.message && 'border-2 border-error',
                  'h-10 max-w-md px-2 py-1 rounded-lg focus:ring-2 focus:ring-white/80 focus:border-primary focus:ring-offset-1 focus:ring-offset-primary'
                )}
                placeholder="joe@email.com"
                {...register('email')}
              />
              {errors.email?.message && (
                <p className="pl-4 text-sm -bottom-5 text-error">
                  {errors.email?.message}
                </p>
              )}
            </label>
            <PrimaryButton type="submit">Subscribe</PrimaryButton>
          </div>
          <label className="space-x-3" htmlFor="IAgreeToRecieveCoolStuff">
            <input
              className="border-2 text-gray-body focus:ring-2 focus:ring-white/80 focus:border-primary focus:ring-offset-1 focus:ring-offset-primary border-gray-placeholder bg-[#D6D8E6] "
              type="checkbox"
              id="IAgreeToRecieveCoolStuff"
              data-testid="i-agree"
              {...register('agreeToRecieve')}
            />
            <span>I agree to receive cool stuff from the Secret Boxes Team!</span>
          </label>
        </form>
      </div>
    </section>
  )
}
