import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Cluster } from 'src/components/every-layout/cluster'
import { Grid } from 'src/components/every-layout/grid'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { DATABASE } from 'src/models/state'
import { Flashcard } from 'src/types/flashcards'
import { verseTitleFull } from 'src/types/verse'

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
      <Box key={flashcard.id}>
        <Stack>
          <strong>{verseTitleFull(flashcard.verse)}</strong>
          <Cluster justify="flex-end">
            <Link href={`/flashcards/${flashcard.id}`}>
              <a>view</a>
            </Link>
          </Cluster>
        </Stack>
      </Box>

      <style jsx>{`
        .root {
          border: 1px solid var(--black);
          border-radius: 5px;
        }

        strong {
          display: block;
        }
        p {
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}
