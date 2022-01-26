import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleHttpError } from 'src/helpers/apiHelpers'
import { adminCollectionGet, COLLECTIONS } from 'src/helpers/firebase'
import { HttpError } from 'src/helpers/httpError'

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      throw new HttpError(405, 'Method not Allowed.')
    }
    const doc = await adminCollectionGet<any>(COLLECTIONS.version, 'version')
    return res.status(200).json(doc.version)
  } catch (e: any) {
    console.log(e.message)
    handleHttpError(e, res)
  }
}

export default Cors({
  allowMethods: ['GET'],
})(webhookHandler as any)
