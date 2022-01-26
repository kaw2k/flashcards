import type { NextPage } from 'next'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { OptionPage } from 'src/components/optionPage'

const Home: NextPage = () => {
  return (
    <Box>
      <Stack>
        <Navigation />
        <Center component="h1" andText>
          Gita Verses
        </Center>
        <OptionPage onDone={(form) => console.log(form)} />
      </Stack>
    </Box>
  )
}

export default Home
