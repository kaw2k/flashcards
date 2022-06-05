import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Center } from 'src/components/every-layout/center'
import { Cover, CoverPrimary } from 'src/components/every-layout/cover'
import { Sidebar } from 'src/components/every-layout/sidebar'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/state'
import { Email } from 'src/types/email'

const Home: NextPage = () => {
  const [form, setForm] = useForm({ email: '' })
  const router = useRouter()

  React.useEffect(() => {
    if (DATABASE.user.email) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Cover>
      <CoverPrimary>
        <Center andText component="h1">
          Login
        </Center>
        <Center intrinsic>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (form.email.trim().length) {
                DATABASE.user.email = Email(form.email)
                DATABASE.init().then(() => {
                  router.push('/')
                })
              }
            }}>
            <Sidebar side="right" noStretch="flex-end">
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  value={form.email}
                  onChange={setForm('email')}
                />
              </div>
              <button>login</button>
            </Sidebar>
          </form>
        </Center>
      </CoverPrimary>
    </Cover>
  )
}

export default Home
