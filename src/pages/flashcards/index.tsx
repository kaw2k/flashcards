import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Cluster } from 'src/components/every-layout/cluster'
import { Grid } from 'src/components/every-layout/grid'
import { Stack } from 'src/components/every-layout/stack'
import { Icon } from 'src/components/icon'
import { Navigation } from 'src/components/navigation'
import { DATABASE } from 'src/models/state'
import { Flashcard } from 'src/types/flashcards'
import { verseTitleFull, verseTitlePartial } from 'src/types/verse'

const FlashcardsIndex: NextPage = () => {
  return (
    <Box>
      <Stack>
        <Navigation />
        <Center component="h1" andText>
          Flashcards
        </Center>
        <Grid>
          {DATABASE.flashcards.flashcards.map((flashcard) => (
            <FlashcardCard flashcard={flashcard} key={flashcard.id} />
          ))}
        </Grid>
      </Stack>
    </Box>
  )
}

export default FlashcardsIndex

const FlashcardCard: React.FC<{
  flashcard: Flashcard
}> = ({ flashcard }) => {
  return (
    <div className="root">
      <Link href={`/flashcards/${flashcard.id}`}>
        <a>
          <Box>
            <strong className="h3">{flashcard.verse.bookTitle}</strong>
            <Cluster space="--s2">
              <Cluster noWrap space="--s-5">
                <Icon icon="book" />
                <p>{verseTitlePartial(flashcard.verse)}</p>
              </Cluster>

              {!!flashcard.notes.length && (
                <Cluster noWrap space="--s-5">
                  <Icon icon="chat_bubble" />
                  <p>{flashcard.notes.length}</p>
                </Cluster>
              )}
            </Cluster>
          </Box>
        </a>
      </Link>

      <style jsx>{`
        .root {
          border: 1px solid var(--grayLight);
          border-radius: 5px;
        }

        strong {
          display: block;
        }
      `}</style>
    </div>
  )
}
