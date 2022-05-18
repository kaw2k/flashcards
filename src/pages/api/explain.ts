import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError, validate } from 'src/helpers/apiHelpers'
import { HttpError } from 'src/helpers/httpError'
import bg from 'src/bg.json'
import sb from 'src/sb.json'
import cc from 'src/cc.json'
import bs from 'src/bs.json'
import { Verse } from 'src/types/verse'
import { adminCollectionQuery, COLLECTIONS } from 'src/helpers/firebase'
import { Flashcard } from 'src/types/flashcards'
import { Email } from 'src/types/email'
import { shuffle } from 'src/helpers/shuffle'
import { sample } from 'src/helpers/sample'

const verses: Verse[] = [
  ...(bg as any).verses,
  ...(cc as any).verses,
  ...(sb as any).verses,
  ...(bs as any).verses,
] as any

export interface ExplainRequest {
  email: string
  numVerses: string
  source: 'flashcards' | 'book'
  anthology: string
  book: 'all' | string
  chapter: 'all' | string
}

export type ExplainResponse = Verse[]

export default async function searchVerses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }

    validate(['numVerses', 'source', 'anthology', 'book', 'chapter'], req.query)

    const numVerses = parseInt(req.query.numVerses as string, 10) || 1
    const email = req.query.email as Email
    const source = req.query.source as ExplainRequest['source']
    const anthology = req.query.anthology as ExplainRequest['anthology']
    const book = req.query.book as ExplainRequest['book']
    const chapter = req.query.chapter as ExplainRequest['chapter']

    let bookVerses

    // Select from the flashcards
    if (source === 'flashcards') {
      const flashcards = await adminCollectionQuery<Flashcard>(
        COLLECTIONS.flashcards,
        { owner: email }
      )
      return res.status(200).json(
        shuffle(flashcards)
          .slice(0, numVerses)
          .map((f) => f.verse)
      )
    }

    if (anthology) {
      if (book === 'all') {
        const filteredVerses = verses.filter(
          (v) => v.meta.anthologyId === anthology
        )
        return res.status(200).json(sample(filteredVerses, numVerses))
      }
      if (chapter === 'all') {
        const filteredVerses = verses.filter(
          (v) => v.meta.anthologyId === anthology && v.meta.bookId === book
        )
        return res.status(200).json(sample(filteredVerses, numVerses))
      }

      const filteredVerses = verses.filter(
        (v) =>
          v.meta.anthologyId === anthology &&
          v.meta.bookId === book &&
          v.meta.chapterNumber === chapter
      )
      return res.status(200).json(sample(filteredVerses, numVerses))
    }

    // We have a book
    if (!anthology) {
      // All vereses in a book
      if (chapter === 'all') {
        const filteredVerses = verses.filter((v) => v.meta.bookId === book)
        return res.status(200).json(sample(filteredVerses, numVerses))
      }
      // A specific chapter in a book
      else {
        const filteredVerses = verses.filter(
          (v) => v.meta.bookId === book && v.meta.chapterNumber === chapter
        )
        return res.status(200).json(sample(filteredVerses, numVerses))
      }
    }
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}
