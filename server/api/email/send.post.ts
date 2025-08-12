import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export default defineEventHandler(async (event) => {
  const { email = '' } = await readBody(event) ?? {}

  try {
    const data = await resend.emails.send({
      from: `Kettlebell Pro <updates.kettlebellpro.fit>`,
      to: [email],
      subject: 'Thanks for subscribing!',
      html: '<strong>It works!</strong>',
    })

    return { data }
  }
  catch (error) {
    return { error }
  }
})
