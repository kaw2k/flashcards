import { cert, initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

export const COLLECTIONS = {
  verses: 'verses',
  books: 'books',
  flashcards: 'flashcards',
  anthologies: 'anthologies',
  version: 'version',
}

if (!getApps().length) {
  initializeApp({
    databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const firestore = getFirestore()
export const admin = {
  auth: getAuth(),
  firestore,
}

export async function adminCollectionIterate<T>(
  collectionPath: string,
  iterator: (item: T) => void
) {
  const PAGE_SIZE = 10
  const collection = firestore.collection(collectionPath)

  let more = true
  let lastItem = null

  while (more) {
    let query = collection.orderBy('__name__').limit(PAGE_SIZE)
    if (lastItem) {
      query = query.startAfter(lastItem)
    }

    const snaps = (await query.get()).docs

    more = snaps.length === PAGE_SIZE
    lastItem = snaps[snaps.length - 1]

    for (let item of snaps) {
      await iterator(item.data() as T)
    }
  }
}

export async function adminCollectionQuery<T>(
  collectionPath: string,
  query: Partial<T>
): Promise<T[]> {
  const collection = firestore.collection(collectionPath)

  let q = collection

  Object.keys(query).forEach((key) => {
    q = q.where(key, '==', (query as any)[key]) as any
  })

  return q.get().then((docs) => docs.docs.map((doc) => doc.data() as T))
}

export async function adminCollectionGet<T>(
  collectionPath: string,
  id: string
): Promise<T> {
  return firestore
    .collection(collectionPath)
    .doc(id)
    .get()
    .then((doc) => doc.data() as T)
}

export async function adminCollectionDelete<T>(
  collectionPath: string,
  id: string
) {
  return firestore.collection(collectionPath).doc(id).delete()
}

export async function adminCollectionAll<T>(
  collectionPath: string
): Promise<T[]> {
  return firestore
    .collection(collectionPath)
    .get()
    .then((docs) => docs.docs.map((doc) => doc.data() as T))
}

export async function adminCollectionSet<T>(
  collectionPath: string,
  id: string,
  item: T
) {
  return firestore.collection(collectionPath).doc(id).set(item)
}

export async function adminCollectionUpdate<T>(
  collectionPath: string,
  id: string,
  item: T
) {
  return firestore.collection(collectionPath).doc(id).update(item)
}

export async function adminCollectionCreate<T>(
  collectionPath: string,
  item: Omit<T, 'id'>
) {
  const newDoc = firestore.collection(collectionPath).doc()
  await firestore
    .collection(collectionPath)
    .doc(newDoc.id)
    .set({ ...item, id: newDoc.id })
  return newDoc.id
}
