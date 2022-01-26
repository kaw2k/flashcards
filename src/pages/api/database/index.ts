import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError } from 'src/helpers/apiHelpers'
import {
  adminCollectionAll,
  adminCollectionGet,
  COLLECTIONS,
} from 'src/helpers/firebase'
import { HttpError } from 'src/helpers/httpError'
import { Anthology } from 'src/types/anthology'
import { Book } from 'src/types/book'
import { Verse } from 'src/types/verse'
import fs from 'fs'

export interface DatabaseResponse {
  verses: Verse[]
  anthologies: Anthology[]
  books: Book[]
  version: string
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }

    // const { version } = await adminCollectionGet<{ version: string }>(
    //   COLLECTIONS.version,
    //   'version'
    // )

    // const [verses, books, anthologies] = await Promise.all([
    //   adminCollectionAll<Verse>(COLLECTIONS.verses),
    //   adminCollectionAll<Book>(COLLECTIONS.books),
    //   adminCollectionAll<Anthology>(COLLECTIONS.anthologies),
    // ])

    // const data: DatabaseResponse = {
    //   verses,
    //   books,
    //   anthologies,
    //   version,
    // }

    fs.writeFileSync('test.txt', 'test')
    // return res.status(200).json(data)
    return res.status(200).json({})
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}

export default Cors({
  allowMethods: ['GET'],
})(webhookHandler as any)
