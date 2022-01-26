import { Id } from './id'

export interface Verse {
  link: string
  id: Id
  meta: {
    verse: string
    chapter: string
    chapterTitle: string
    order: number
    full?: string
  }
  text: string[] // Sanskrit
  synonyms: string
  anthology?: string
  book?: string
  bookTitle: string
  translation: string
  purport: Paragraph[]
  wordCount: number
  wordsReadSoFar: number
}

interface Paragraph {
  type: 'verse' | 'text'
  text: string[]
}

export function verseTitlePartial(verse: Verse) {
  return `${verse.meta.chapter}.${verse.meta.verse}`
}

export function verseTitleFull(verse: Verse) {
  return `${verse.bookTitle}: ${verse.meta.chapter}.${verse.meta.verse}`
}
