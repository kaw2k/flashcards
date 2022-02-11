import React from 'react'
import { useRouter } from 'next/router'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { Sanskrit } from 'src/components/sanskrit'
import { DATABASE } from 'src/models/state'
import { verseTitleFull } from 'src/types/verse'
import { useForm } from 'src/helpers/useForm'
import { Cluster } from 'src/components/every-layout/cluster'
import { Flashcard } from 'src/types/flashcards'
import { Sidebar } from 'src/components/every-layout/sidebar'
import { Icon } from 'src/components/icon'

export default function FlashcardDetailView() {
  const router = useRouter()
  const id = router.query.id
  const [form, setForm] = useForm({ notes: '' })
  const [flashcard, setFlashcard] = React.useState(
    DATABASE.flashcards.flashcards.find((f) => f.id === id)
  )

  React.useEffect(() => {
    if (!flashcard) {
      router.push('/flashcards')
    }
  }, [])

  if (!flashcard) return null

  return (
    <Box>
      <Stack>
        <Navigation />
        <Center andText component="h1">
          {verseTitleFull(flashcard.verse)}
        </Center>

        <Center andText>
          <Stack>
            <Sanskrit>{flashcard.verse.text}</Sanskrit>
            <p>{flashcard.verse.translation}</p>
          </Stack>
        </Center>

        <Center component="h3" andText>
          Notes
        </Center>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            const nextFlashcard: Flashcard = {
              ...flashcard,
              notes: flashcard.notes.concat(form.notes),
            }

            DATABASE.flashcards.update(nextFlashcard)
            setFlashcard(nextFlashcard)

            setForm('notes', '')
          }}>
          <Sidebar side="right">
            <input
              placeholder="add a note..."
              onChange={setForm('notes')}
              value={form.notes}
            />
            <button type="submit"> add note</button>
          </Sidebar>
        </form>

        {!!flashcard.notes?.length && (
          <Stack component="ul">
            {flashcard.notes.map((note, i) => (
              <Cluster component="li" key={note + i} justify="space-between">
                <p>{note}</p>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => {
                    const nextFlashcard: Flashcard = {
                      ...flashcard,
                      notes: flashcard.notes.filter((n) => n !== note),
                    }

                    DATABASE.flashcards.update(nextFlashcard)
                    setFlashcard(nextFlashcard)
                  }}>
                  <Icon icon="clear" />
                </button>
              </Cluster>
            ))}
          </Stack>
        )}
        <button
          onClick={() => {
            DATABASE.flashcards.remove(flashcard)
            router.push('/flashcards')
          }}>
          remove flashcard
        </button>
      </Stack>

      <style jsx>{`
        .icon-button {
          border: none;
          border-radius: 50%;
          width: 2em;
          height: 2em;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </Box>
  )
}
