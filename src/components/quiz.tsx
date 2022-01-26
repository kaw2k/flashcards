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
    window.scrollTo(0, 0)
    setPrompts(prompts.slice(1))
  }

  React.useEffect(() => {
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

        <Center component="em" andText>
          scroll for answers
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
