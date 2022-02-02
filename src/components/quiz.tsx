import Link from 'next/link'
import React from 'react'
import { Session } from 'src/helpers/generateSession'
import { verseTitleFull } from 'src/types/verse'
import { Center } from './every-layout/center'
import { Cluster } from './every-layout/cluster'
import { Cover, CoverPrimary } from './every-layout/cover'
import { Stack } from './every-layout/stack'
import { Icon } from './icon'
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
          <Center andText component="h2">
            {currentPrompt.prompt.title}
          </Center>
        </CoverPrimary>

        <Cluster justify="space-around">
          <button className="wrapper icon" onClick={onDone}>
            <Icon color="var(--grayLight)" icon="home" />
          </button>
          <button
            className="wrapper icon"
            onClick={() =>
              window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }>
            <Icon color="var(--grayLight)" icon="expand_more" />
          </button>
          <button className="wrapper icon" onClick={next}>
            <Icon color="var(--grayLight)" icon="chevron_right" />
          </button>
        </Cluster>
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

        <Cluster justify="space-around">
          <button className="wrapper icon" onClick={next}>
            <Icon color="var(--grayLight)" icon="chevron_right" />
          </button>
        </Cluster>
      </Cover>
      <style jsx>{`
        .icon {
          border: 1px solid var(--grayLight);
          border-radius: 50%;
          width: calc(3 * var(--s0));
          height: calc(3 * var(--s0));
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2em;
        }
      `}</style>
    </>
  )
}
