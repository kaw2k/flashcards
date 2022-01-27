import Image from 'next/image'
import React from 'react'
import { Session } from 'src/helpers/generateSession'
import { verseTitleFull } from 'src/types/verse'
import { Center } from './every-layout/center'
import { Cover, CoverPrimary } from './every-layout/cover'
import { Stack } from './every-layout/stack'
import { Sanskrit } from './sanskrit'

export const Quiz: React.FC<{ session: Session; onDone(): void }> = ({
  session,
  onDone,
}) => {
  const [prompts, setPrompts] = React.useState(session)
  const currentPrompt = prompts[0]

  function next() {
    setPrompts(prompts.slice(1))
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!currentPrompt) onDone()
  }, [currentPrompt])

  if (!currentPrompt) return null

  return (
    <>
      <Cover>
        <CoverPrimary>
          <Center andText component="h1">
            {currentPrompt.prompt.title}
          </Center>
        </CoverPrimary>

        <Center>
          <button
            className="wrapper"
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
            <Image
              alt="scroll to view answer"
              src="/icons/expand_more.svg"
              height={40}
              width={40}
            />
          </button>
        </Center>
      </Cover>

      <Cover>
        <CoverPrimary>
          <Center andText>
            <Stack>
              <h2>{verseTitleFull(currentPrompt.flashcard.verse)}</h2>
              <Sanskrit>{currentPrompt.flashcard.verse.text}</Sanskrit>
              <p>{currentPrompt.flashcard.verse.translation}</p>
            </Stack>
          </Center>
        </CoverPrimary>

        <button onClick={next}>next</button>
      </Cover>
    </>
  )
}
