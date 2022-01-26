import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError, validate } from 'src/helpers/apiHelpers'
import { adminCollectionQuery, COLLECTIONS } from 'src/helpers/firebase'
import { HttpError } from 'src/helpers/httpError'
import { Email } from 'src/types/email'
import { Flashcard } from 'src/types/flashcards'

export interface FlashcardsRequest {
  email: Email
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }

    validate(['email'], req.query)
    const email = req.query.email as Email

    const flashcards = await adminCollectionQuery<Flashcard>(
      COLLECTIONS.flashcards,
      { owner: email }
    )

    return res.status(200).json(flashcards)
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}

export default Cors({
  allowMethods: ['GET'],
})(webhookHandler as any)
