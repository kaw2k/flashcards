import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Cluster } from 'src/components/every-layout/cluster'
import { Cover, CoverPrimary } from 'src/components/every-layout/cover'
import { Grid } from 'src/components/every-layout/grid'
import { Sidebar } from 'src/components/every-layout/sidebar'
import { Stack } from 'src/components/every-layout/stack'
import { Icon } from 'src/components/icon'
import { Navigation } from 'src/components/navigation'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/models/state'
import { Flashcard } from 'src/types/flashcards'
import { Id } from 'src/types/id'
import { Verse, verseTitlePartial } from 'src/types/verse'

const FlashcardsIndex: NextPage = () => {
  const [form, setForm] = useForm({ search: '' })
  const [flashcards, setFlashcards] = useState(DATABASE.flashcards.flashcards)

  function addCard(verse: Verse) {
    const flashcard: Flashcard = {
      id: Id(),
      history: [],
      owner: DATABASE.user.email,
      verse: verse,
      notes: [],
      dateAdded: Date.now(),
    }

    DATABASE.flashcards.update(flashcard)
    setFlashcards(DATABASE.flashcards.flashcards)
    setForm('search', '')
  }

  return (
    <Cover>
      <Navigation />

      <CoverPrimary>
        <Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const activeVerse = DATABASE.verses.search(form.search)[0]
              if (activeVerse?.item) {
                addCard(activeVerse.item)
              }
            }}>
            <label htmlFor="search">Add Flashcard: </label>
            <Sidebar side="right">
              <div>
                <input
                  placeholder="ie: 18.66..."
                  id="search"
                  value={form.search}
                  onChange={setForm('search')}
                />
              </div>
              <button type="submit">add card</button>
            </Sidebar>
          </form>

          {DATABASE.verses
            .search(form.search)
            .slice(0, 10)
            .map(({ item: verse }) => (
              <VerseCard
                verse={verse}
                key={verse.id}
                onAdd={() => addCard(verse)}
              />
            ))}

          {!form.search.length && (
            <Grid>
              {flashcards.map((flashcard) => (
                <FlashcardCard flashcard={flashcard} key={flashcard.id} />
              ))}
            </Grid>
          )}
        </Stack>
      </CoverPrimary>
    </Cover>
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
            <strong>{flashcard.verse.bookTitle}</strong>
            <Cluster space="--s2">
              <Cluster noWrap space="--s-5">
                <Icon icon="book" color="var(--grayLight)" />
                <p>{verseTitlePartial(flashcard.verse)}</p>
              </Cluster>

              {!!flashcard.notes.length && (
                <Cluster noWrap space="--s-5">
                  <Icon icon="chat_bubble" color="var(--grayLight)" />
                  <p>{flashcard.notes.length}</p>
                </Cluster>
              )}
            </Cluster>
          </Box>
        </a>
      </Link>

      <style jsx>{`
        .root {
          transition: all 0.3s ease-in-out;
          border: 1px solid var(--grayLight);
          border-radius: 5px;
          background-color: var(--white);
        }

        .root:hover {
          border-color: var(--black);
        }

        strong {
          display: block;
        }

        a {
          font-weight: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

const VerseCard: React.FC<{ verse: Verse; onAdd: () => void }> = ({
  verse,
  onAdd,
}) => {
  const [added, setAdded] = React.useState(DATABASE.flashcards.hasVerse(verse))

  return (
    <div className="root">
      <Box>
        <Center andText>
          <Stack>
            <strong>
              {verse.bookTitle}: {verse.meta.chapter}.{verse.meta.verse}
            </strong>
            <p>{verse.translation}</p>
          </Stack>
        </Center>
      </Box>

      {!added && (
        <button
          onClick={() => {
            setAdded(true)
            onAdd()
          }}>
          add
        </button>
      )}

      <style jsx>{`
        .root {
          border: 1px solid var(--black);
          border-radius: 5px;
          background-color: var(--white);
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
