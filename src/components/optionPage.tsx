import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { SessionOptions, VariantOptions } from 'src/helpers/generateSession'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/models/state'
import { verseTitlePartial } from 'src/types/verse'
import { Checkbox } from './checkbox'
import { Box } from './every-layout/box'
import { Center } from './every-layout/center'
import { Grid } from './every-layout/grid'
import { Stack } from './every-layout/stack'
import { Switcher } from './every-layout/switcher'
import { Radio } from './radio'

export const OptionPage: React.FC<{
  onDone(options: SessionOptions): void
}> = ({ onDone }) => {
  const [form, setForm] = useForm({
    type: 'learn',
    variant: VariantOptions,
    order: 'random',
    cards: 'all',
    selectedCards: [],
  } as SessionOptions)

  if (!DATABASE.flashcards.flashcards.length) {
    return (
      <Center intrinsic>
        <p>
          Add{' '}
          <Link href="/verses">
            <a>verses</a>
          </Link>{' '}
          to get started
        </p>
      </Center>
    )
  }

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
        <Switcher threshold="400px">
          {/* <div>
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
          </div> */}
          <div>
            <Center component="h3" intrinsic>
              Order
            </Center>
            <Radio
              name="order"
              onChange={setForm('order')}
              value={form.order}
              options={[
                { label: 'Random', value: 'random', icon: 'shuffle' },
                { label: 'Book Order', value: 'book-order', icon: 'sort' },
                {
                  label: 'Chronological',
                  value: 'chronological',
                  icon: 'calendar_today',
                },
                // { label: 'proficency', value: 'proficency' },
              ]}
            />
          </div>
          <div>
            <Center component="h3" intrinsic>
              Variant
            </Center>
            <Checkbox
              name="variant"
              onChange={setForm('variant')}
              options={VariantOptions}
              value={form.variant}
            />
          </div>

          <div>
            <Center component="h3" intrinsic>
              Flashcards
            </Center>
            <Radio
              name="verses"
              value={form.cards}
              onChange={setForm('cards')}
              options={[
                { label: 'All', value: 'all', icon: 'done_all' },
                { label: 'Partial', value: 'partial', icon: 'done' },
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
          color: var(--white);
          background-color: var(--black);
        }
      `}</style>
    </form>
  )
}
