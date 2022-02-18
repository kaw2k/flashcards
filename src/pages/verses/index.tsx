import type { NextPage } from 'next'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Cluster } from 'src/components/every-layout/cluster'
import { Grid } from 'src/components/every-layout/grid'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/models/state'
import { Id } from 'src/types/id'
import { Verse } from 'src/types/verse'

const VersesIndex: NextPage = () => {
  const [form, setForm] = useForm({ search: '' })

  return (
    <Box>
      <Navigation />

      <Center component="h1" andText>
        Verses:
      </Center>

      <Stack>
        <div>
          <label htmlFor="search">Search: </label>
          <input
            placeholder="search"
            id="search"
            value={form.search}
            onChange={setForm('search')}
          />
        </div>

        {DATABASE.verses
          .search(form.search)
          .slice(0, 10)
          .map(({ item: verse }) => (
            <VerseCard verse={verse} key={verse.id} />
          ))}
      </Stack>
    </Box>
  )
}

export default VersesIndex

const VerseCard: React.FC<{ verse: Verse }> = ({ verse }) => {
  const [added, setAdded] = React.useState(DATABASE.flashcards.hasVerse(verse))

  return (
    <div className="root">
      <Box>
        <Center andText>
          <Stack>
            <strong>
              {verse.bookTitle}: {verse.meta.chapter}.{verse.meta.verse}
            </strong>
            <p>{verse.text}</p>
            <p>{verse.translation}</p>
          </Stack>
        </Center>
      </Box>

      {!added && (
        <button
          onClick={() => {
            setAdded(true)
            DATABASE.flashcards.update({
              id: Id(),
              history: [],
              owner: DATABASE.user.email,
              verse: verse,
              notes: [],
              dateAdded: Date.now(),
            })
          }}>
          add
        </button>
      )}

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
        button {
          display: block;
          width: 100%;
          border: none;
          border-top: 1px solid var(--black);
          border-radius: 0;
          padding: var(--s-3) var(--s0);
        }
      `}</style>
    </div>
  )
}
