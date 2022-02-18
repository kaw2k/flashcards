import React from 'react'
import { Session } from 'src/helpers/generateSession'
import { DATABASE } from 'src/models/state'
import {
  FlashcardOptions,
  FlashcardSteps,
  progressCard,
} from 'src/types/flashcards'
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

  const next = (option: FlashcardOptions) => () => {
    DATABASE.flashcards.update({
      ...currentPrompt.flashcard,
      history: [
        progressCard(option, currentPrompt.flashcard.history[0]),
        ...currentPrompt.flashcard.history,
      ],
    })

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
            <span className="pre-wrap">{currentPrompt.prompt.title}</span>
          </Center>
        </CoverPrimary>

        <Cluster justify="space-around">
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
        </Cluster>
      </Cover>

      <Cover>
        <CoverPrimary>
          <Center andText>
            <Stack>
              <h2>{verseTitleFull(currentPrompt.flashcard.verse)}</h2>
              <Sanskrit>{currentPrompt.flashcard.verse.text}</Sanskrit>
              <Sanskrit>{currentPrompt.flashcard.verse.synonyms}</Sanskrit>
              <p>{currentPrompt.flashcard.verse.translation}</p>
            </Stack>
          </Center>
        </CoverPrimary>

        <Cluster justify="space-around">
          <button className="option" onClick={next(FlashcardOptions.Again)}>
            again
          </button>
          <button className="option" onClick={next(FlashcardOptions.Hard)}>
            hard
          </button>
          <button className="option" onClick={next(FlashcardOptions.Good)}>
            good
          </button>
          <button className="option" onClick={next(FlashcardOptions.Easy)}>
            easy
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

        .option {
          border: 1px solid var(--grayLight);
          color: var(--grayLight);
          border-radius: 5px;
        }

        .pre-wrap {
          white-space: pre-wrap;
        }
      `}</style>
    </>
  )
}
