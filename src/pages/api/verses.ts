import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError, validate } from 'src/helpers/apiHelpers'
import { HttpError } from 'src/helpers/httpError'
import bg from 'src/data/bg.json'
import sb from 'src/data/sb.json'
import cc from 'src/data/cc.json'
import bs from 'src/data/bs.json'
import { Verse } from 'src/types/verse'

import Fuse from 'fuse.js'

const verses: Verse[] = [
  ...(bg as any).verses,
  ...(cc as any).verses,
  ...(sb as any).verses,
  ...(bs as any).verses,
] as any

const fuseVerses = new Fuse(verses, {
  keys: [
    {
      name: 'meta.anthologyTitle',
      weight: 0.35,
    },
    {
      name: 'meta.bookTitle',
      weight: 0.25,
    },
    {
      name: 'meta.verseId',
      weight: 1,
    },
  ],
  isCaseSensitive: false,
})

export interface VersesRequest {
  search: string
}

export type VersesResponse = Verse[]

export default function searchVerses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }

    validate(['search'], req.query)

    const search = req.query.search as string

    const versesResponse: VersesResponse = fuseVerses
      .search(search)
      .slice(0, 5)
      .map((item) => item.item)

    return res.status(200).json(versesResponse)
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}
