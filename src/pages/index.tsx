import clsx from 'clsx'
import Link from 'next/link'
import {
  DefaultVariantOptions,
  SessionOptions,
  VariantOptions,
} from 'src/helpers/generateSession'
import { useForm } from 'src/helpers/useForm'
import { DATABASE } from 'src/models/state'
import { verseTitlePartial } from 'src/types/verse'
import { Checkbox } from '../components/checkbox'
import type { NextPage } from 'next'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import { Center } from 'src/components/every-layout/center'
import { Cover, CoverPrimary } from 'src/components/every-layout/cover'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { Quiz } from 'src/components/quiz'
import { Practice } from 'src/components/practice'
import { generateSession, Session } from 'src/helpers/generateSession'
import { Switcher } from 'src/components/every-layout/switcher'
import { Grid } from 'src/components/every-layout/grid'
import { Radio } from 'src/components/radio'
import { IconButton } from 'src/components/iconButton'

const Home: NextPage = () => {
  const [session, setSession] = React.useState<Session | null>(null)

  const [form, setForm] = useForm({
    type: 'learn',
    variant: DefaultVariantOptions,
    order: 'random',
    cards: 'all',
    selectedCards: [],
  } as SessionOptions)

  if (!DATABASE.flashcards.flashcards.length) {
    return (
      <Cover>
        <Navigation />
        <CoverPrimary>
          <Center intrinsic>
            <p>
              Add{' '}
              <Link href="/verses">
                <a>verses</a>
              </Link>{' '}
              to get started
            </p>
          </Center>
        </CoverPrimary>
      </Cover>
    )
  }

  if (session) {
    return form.order === 'proficency' ? (
      <Quiz session={session} onDone={() => setSession(null)} />
    ) : (
      <Practice session={session} onDone={() => setSession(null)} />
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (form.order && form.variant && form.type) {
          if (form.cards === 'all') {
            setSession(
              generateSession({
                ...form,
                selectedCards: DATABASE.flashcards.flashcards,
              })
            )
          } else {
            setSession(generateSession(form))
          }
        }
      }}>
      <Cover>
        <Navigation />

        <CoverPrimary>
          <Stack space="--s2">
            <Switcher space="--s2" threshold="400px">
              <div>
                <Center component="h2" intrinsic>
                  Order
                </Center>
                <Radio
                  name="order"
                  onChange={setForm('order')}
                  value={form.order}
                  options={[
                    { label: 'Random', value: 'random', icon: 'shuffle' },
                    {
                      label: 'proficency',
                      value: 'proficency',
                      icon: 'psychology',
                    },
                    { label: 'Book Order', value: 'book-order', icon: 'book' },
                    {
                      label: 'date',
                      value: 'chronological',
                      icon: 'calendar_today',
                    },
                  ]}
                />
              </div>
              <div>
                <Center component="h2" intrinsic>
                  Variant
                </Center>
                <Checkbox
                  name="variant"
                  onChange={setForm('variant')}
                  options={VariantOptions}
                  value={form.variant}
                />
              </div>

              {form.order !== 'proficency' && (
                <div>
                  <Center component="h2" intrinsic>
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
              )}
            </Switcher>

            {form.order !== 'proficency' && form.cards === 'partial' && (
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
          </Stack>
        </CoverPrimary>

        <Center intrinsic>
          <IconButton
            icon="play_arrow"
            type="submit"
            color="var(--grayLight)"
          />
        </Center>
      </Cover>

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

export default Home
