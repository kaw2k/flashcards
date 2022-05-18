import { useForm } from 'src/helpers/useForm'
import type { NextPage } from 'next'
import React from 'react'
import { Center } from 'src/components/every-layout/center'
import { Cover, CoverPrimary } from 'src/components/every-layout/cover'
import { Stack } from 'src/components/every-layout/stack'
import { Navigation } from 'src/components/navigation'
import { Radio } from 'src/components/radio'
import { IconButton } from 'src/components/iconButton'

import sbIndex from 'src/sb-index.json'
import bgIndex from 'src/bg-index.json'
import ccIndex from 'src/cc-index.json'
import bsIndex from 'src/bs-index.json'
import { Cluster } from 'src/components/every-layout/cluster'
import { fetchGetJSON } from 'src/helpers/apiHelpers'
import { ExplainRequest, ExplainResponse } from './api/explain'
import { DATABASE } from 'src/models/state'
import {
  Verse,
  VerseOld,
  verseOldTitleFull,
  verseTitleFull,
} from 'src/types/verse'
import { Sanskrit } from 'src/components/sanskrit'
import { FullVerseRequest, FullVerseResponse } from './api/fullVerse'
import { Icon } from 'src/components/icon'
import { Switcher } from 'src/components/every-layout/switcher'

interface AnthologyIndex {
  type: 'anthology'
  id: string // either anthologyId or bookId
  anthologyId: string
  anthologyTitle: string
  anthologyTitleRaw: string
  books: BookIndex[]
}

interface BookIndex {
  type: 'book'
  id: string // either anthologyId or bookId
  bookId: string
  bookTitle: string
  bookTitleRaw: string
  anthologyId: string
  chapters: {
    chapterNumber: string
    chapterTitle: string
  }[]
}

type Indecies = (BookIndex | AnthologyIndex)[]

const indecies: Indecies = [bgIndex, sbIndex, ccIndex, bsIndex] as any

const RandomVerse: NextPage = () => {
  const [session, setSession] = React.useState<Verse[]>([])

  const [form, setForm, setFormRaw] = useForm({
    source: 'flashcards',
    numVerses: '1',
    anthology: '',
    book: 'bg',
    chapter: 'all',
  })

  function fetchVerses() {
    fetchGetJSON<ExplainResponse>('/api/explain', {
      email: DATABASE.user.email,
      anthology: form.anthology,
      book: form.book,
      chapter: form.chapter,
      numVerses: form.numVerses,
      source: form.source,
    } as ExplainRequest).then((verses) => setSession(verses || []))
  }

  if (!!session.length) {
    return (
      <ExplainView
        key={session.map((v) => v.meta.verseId).join(' ')}
        done={() => setSession([])}
        refreshVerses={fetchVerses}
        verses={session}
      />
    )
  }

  const selectedAnthology =
    !!form.anthology &&
    (indecies.find(
      (i) => i.type === 'anthology' && i.id === form.anthology
    ) as AnthologyIndex)

  const selectedBook = selectedAnthology
    ? selectedAnthology.books.find((i) => i.id === form.book)
    : (indecies.find((i) => i.id === form.book) as BookIndex)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        fetchVerses()
      }}>
      <Cover>
        <Navigation />

        <CoverPrimary>
          <Stack space="--s2">
            <Center component="h2" intrinsic>
              Number of Verses
            </Center>
            <Radio
              name="numVerses"
              onChange={setForm('numVerses')}
              value={form.numVerses}
              options={[
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ]}
            />
            <Center component="h2" intrinsic>
              Source
            </Center>
            <Radio
              name="order"
              onChange={setForm('source')}
              value={form.source}
              options={[
                {
                  label: 'Flashcards',
                  value: 'flashcards',
                  icon: 'dashboard',
                },
                {
                  label: 'Book',
                  value: 'book',
                  icon: 'menu_book',
                },
              ]}
            />

            {form.source === 'book' && (
              <div>
                <Center component="h2" intrinsic>
                  Book
                </Center>

                <Cluster justify="center">
                  <select
                    onChange={(e) => {
                      const selected = indecies.find(
                        (i) => i.id === e.currentTarget.value
                      )

                      if (selected?.type === 'anthology') {
                        setFormRaw({
                          ...form,
                          anthology: e.currentTarget.value,
                          book: 'all',
                          chapter: 'all',
                        })
                      } else {
                        setFormRaw({
                          ...form,
                          book: e.currentTarget.value,
                          anthology: '',
                          chapter: 'all',
                        })
                      }
                    }}>
                    {indecies.map((i) => (
                      <option value={i.id} key={i.id}>
                        {i.type === 'book'
                          ? i.bookTitleRaw
                          : i.anthologyTitleRaw}
                      </option>
                    ))}
                  </select>

                  {selectedAnthology && (
                    <select
                      value={form.book}
                      onChange={(e) => {
                        setFormRaw({
                          ...form,
                          book: e.currentTarget.value,
                          chapter: 'all',
                        })
                      }}>
                      <option value="all">All Cantos</option>
                      {selectedAnthology.books.map((i) => (
                        <option value={i.id} key={i.id}>
                          {i.bookTitleRaw}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedBook && (
                    <select
                      value={form.chapter}
                      onChange={(e) => {
                        setFormRaw({
                          ...form,
                          chapter: e.currentTarget.value,
                        })
                      }}>
                      <option value="all">All Chapters</option>
                      {selectedBook.chapters.map((i) => (
                        <option value={i.chapterNumber} key={i.chapterNumber}>
                          {i.chapterNumber}: {i.chapterTitle}
                        </option>
                      ))}
                    </select>
                  )}
                </Cluster>
              </div>
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
        input[type='radio'] {
          display: none;
        }

        input[type='radio']:checked + label {
          font-weight: bold;
        }

        img {
          max-width: 50px;
        }
      `}</style>
    </form>
  )
}

export default RandomVerse

const ExplainView: React.FC<{
  verses: Verse[]
  refreshVerses(): void
  done(): void
}> = ({ refreshVerses, verses, done }) => {
  const [verse, setVerse] = React.useState<
    (Verse & Pick<VerseOld, 'purport'>) | null
  >(null)

  React.useEffect(() => {
    if (verses.length === 1) {
      fetchFullVerse(verses[0])
    }
  }, [verses])

  async function fetchFullVerse(v: Verse) {
    const full = await fetchGetJSON<FullVerseResponse>('/api/fullVerse', {
      verseId: v.meta.verseId,
    } as FullVerseRequest)

    setVerse({ ...v, purport: full?.purport || [] })
  }

  if (!verses.length) return null

  if (!verse) {
    return (
      <Cover>
        <Center andText component="p">
          Select a verse, on the next page you will get the sanskrit and
          english. Explain the verse and scroll down to see the purport.
        </Center>
        <CoverPrimary>
          <Stack>
            <Switcher limit={3} threshold="700px">
              {verses.map((v) => (
                <button
                  className="card"
                  key={v.meta.verseId}
                  onClick={() => fetchFullVerse(v)}>
                  <strong>{verseTitleFull(v)}</strong>
                  <span>{v.translation}</span>
                </button>
              ))}
            </Switcher>
          </Stack>
        </CoverPrimary>

        <Cluster justify="space-around">
          <button className="wrapper icon" onClick={done}>
            <Icon color="var(--grayLight)" icon="home" />
          </button>
        </Cluster>
        <style jsx>{`
          .card {
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            align-items: center;
            padding: 0.5em 1em;
          }

          span,
          strong {
            display: block;
          }

          span {
            margin-top: 0.5em;
          }

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
      </Cover>
    )
  }

  return (
    <>
      <Cover>
        <CoverPrimary>
          <Center andText>
            <Stack>
              <h2>{verseTitleFull(verse)}</h2>
              <Sanskrit>{verse.text}</Sanskrit>
              <Sanskrit>{verse.synonyms}</Sanskrit>
              <p>{verse.translation}</p>
            </Stack>
          </Center>
        </CoverPrimary>
        <Cluster justify="space-around">
          <button className="wrapper icon" onClick={done}>
            <Icon color="var(--grayLight)" icon="home" />
          </button>

          <button
            className="wrapper icon"
            onClick={() =>
              window.scrollTo({
                left: 0,
                top: window.innerHeight,
                behavior: 'smooth',
              })
            }>
            <Icon color="var(--grayLight)" icon="expand_more" />
          </button>
          <button className="wrapper icon" onClick={refreshVerses}>
            <Icon color="var(--grayLight)" icon="chevron_right" />
          </button>
        </Cluster>
      </Cover>

      <Cover>
        <CoverPrimary>
          <Stack>
            <h2>{verseTitleFull(verse)}</h2>
            {verse.purport.map((t, i) =>
              t.type === 'verse' ? (
                <Center andText key={i}>
                  <Sanskrit>{t.text}</Sanskrit>
                </Center>
              ) : (
                <p className="justify" key={i}>
                  {t.text}
                </p>
              )
            )}
          </Stack>
        </CoverPrimary>

        <Cluster justify="space-around">
          <button className="wrapper icon" onClick={done}>
            <Icon color="var(--grayLight)" icon="home" />
          </button>

          <button className="wrapper icon" onClick={refreshVerses}>
            <Icon color="var(--grayLight)" icon="chevron_right" />
          </button>
        </Cluster>
      </Cover>
      <style jsx>{`
        .justify {
          text-align: justify;
        }

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
