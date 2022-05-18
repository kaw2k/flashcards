import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError, validate } from 'src/helpers/apiHelpers'
import { HttpError } from 'src/helpers/httpError'
import { VerseOld } from 'src/types/verse'
import { adminCollectionGet, COLLECTIONS } from 'src/helpers/firebase'

export interface FullVerseRequest {
  verseId: string
}

export type FullVerseResponse = VerseOld

export default async function searchVerses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }

    validate(['verseId'], req.query)

    const verseId = req.query.verseId as string

    const oldVerse = await adminCollectionGet<VerseOld>(
      COLLECTIONS.verses,
      verseId
    )
    return res.status(200).json(oldVerse)
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}
