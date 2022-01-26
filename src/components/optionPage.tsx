import clsx from 'clsx'
import React from 'react'
import { SessionOptions } from 'src/helpers/generateSession'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/models/state'
import VersesIndex from 'src/pages/verses'
import { Flashcard } from 'src/types/flashcards'
import { Verse, verseTitlePartial } from 'src/types/verse'
import { Box } from './every-layout/box'
import { Center } from './every-layout/center'
import { Grid } from './every-layout/grid'
import { Stack } from './every-layout/stack'
import { Switcher } from './every-layout/switcher'
import { Radio } from './radio'

/*
Order (asc and dec)
- chronological
- book order
- proficency
- random

Modes
- practice
- quiz
- learn

Variants (for practice and quiz)
- random (any of the bellow)
- verse number
- note
- sanskrit
- english

*/

export const OptionPage: React.FC<{
  onDone(options: SessionOptions): void
}> = ({ onDone }) => {
  const [form, setForm] = useForm({
    type: 'learn',
    variant: 'random',
    order: 'random',
    cards: 'all',
    selectedCards: [],
  } as SessionOptions)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (form.order && form.variant && form.type) {
          if (form.cards === 'all') {
            onDone({ ...form, selectedCards: DATABASE.flashcards.flashcards })
          } else {
            onDone(form)
          }
        }
      }}>
      <Stack>
        <Switcher>
          <div>
            <strong>Type:</strong>
            <Radio
              name="type"
              value={form.type}
              onChange={setForm('type')}
              options={[
                { label: 'learn', value: 'learn' },
                { label: 'practice', value: 'practice' },
                { label: 'quiz', value: 'quiz' },
              ]}
            />
          </div>
          <div>
            <strong>Order:</strong>
            <Radio
              name="order"
              onChange={setForm('order')}
              value={form.order}
              options={[
                { label: 'random', value: 'random' },
                { label: 'chronological', value: 'chronological' },
                { label: 'book-order', value: 'book-order' },
                { label: 'proficency', value: 'proficency' },
              ]}
            />
          </div>
          <div>
            <strong>Variant:</strong>
            <Radio
              name="variant"
              value={form.variant}
              onChange={setForm('variant')}
              options={[
                { label: 'random', value: 'random' },
                { label: 'verse-number', value: 'verse-number' },
                { label: 'note', value: 'note' },
                { label: 'sanskrit', value: 'sanskrit' },
                { label: 'english', value: 'english' },
              ]}
            />
          </div>

          <div>
            <strong>Flashcards:</strong>
            <Radio
              name="verses"
              value={form.cards}
              onChange={setForm('cards')}
              options={[
                { label: 'all', value: 'all' },
                { label: 'partial', value: 'partial' },
              ]}
            />
          </div>
        </Switcher>

        {form.cards === 'partial' && (
          <Grid>
            {DATABASE.flashcards.flashcards.map((flashcard) => {
              const isSelected = form.selectedCards.find(
                (card) => card.id === flashcard.id
              )

              return (
                <button
                  type="button"
                  className={clsx('card', { selected: isSelected })}
                  key={flashcard.id}
                  onClick={() => {
                    if (!isSelected) {
                      setForm(
                        'selectedCards',
                        form.selectedCards.concat(flashcard)
                      )
                    } else {
                      setForm(
                        'selectedCards',
                        form.selectedCards.filter(
                          (card) => card.id !== flashcard.id
                        )
                      )
                    }
                  }}>
                  <Box>
                    <Stack>
                      <strong>{verseTitlePartial(flashcard.verse)}</strong>
                      <p>
                        {flashcard.verse.translation
                          .split(' ')
                          .slice(0, 12)
                          .join(' ')
                          .concat('...')}
                      </p>
                    </Stack>
                  </Box>
                </button>
              )
            })}
          </Grid>
        )}

        <Center andText>
          <button>start</button>
        </Center>
      </Stack>

      <style jsx>{`
        .card {
          border: 1px solid var(--black);
          border-radius: 5px;
        }
        .card.selected {
          color: white;
          background-color: var(--black);
        }
      `}</style>
    </form>
  )
}
