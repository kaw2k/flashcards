import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError, validate } from 'src/helpers/apiHelpers'
import {
  adminCollectionDelete,
  adminCollectionSet,
  COLLECTIONS,
} from 'src/helpers/firebase'
import { HttpError } from 'src/helpers/httpError'
import { Flashcard } from 'src/types/flashcards'

export interface FlashcardsRequestPost {
  flashcard: Flashcard
}

export interface FlashcardsRequestDelete {}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const flashcardId = req.query.id as Flashcard['id']

    if (req.method === 'POST') {
      validate(['flashcard'], req.body)
      const flashcard = req.body.flashcard as Flashcard

      await adminCollectionSet<Flashcard>(
        COLLECTIONS.flashcards,
        flashcardId,
        flashcard
      )

      return res.status(200).send(flashcard)
    }

    if (req.method === 'DELETE') {
      // TODO: Validate you are deleting your own flashcard
      await adminCollectionDelete(COLLECTIONS.flashcards, flashcardId)
      return res.status(200).send({ message: 'ok' })
    }

    res.setHeader('Allow', 'DELETE, POST')
    throw new HttpError(405, 'Method not Allowed.')
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}

export default Cors({
  allowMethods: ['POST', 'DELETE'],
})(webhookHandler as any)
