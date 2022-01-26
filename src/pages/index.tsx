import type { NextPage } from 'next'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { OptionPage } from 'src/components/optionPage'
import { Quiz } from 'src/components/quiz'
import { generateSession, Session } from 'src/helpers/generateSession'

const Home: NextPage = () => {
  const [session, setSession] = React.useState<Session | null>(null)

  if (session) {
    return <Quiz session={session} onDone={() => setSession(null)} />
  }

  return (
    <Box>
      <Stack>
        <Navigation />
        <Center component="h1" andText>
          Gita Verses
        </Center>
        <OptionPage
          onDone={(sessionOptions) =>
            setSession(generateSession(sessionOptions))
          }
        />
      </Stack>
    </Box>
  )
}

export default Home
