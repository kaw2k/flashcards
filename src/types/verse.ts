import { Id } from './id'

export interface VerseOld {
  link: string
  id: Id
  meta: {
    verse: string
    chapter?: string
    chapterTitle?: string
    order: number
    full?: string
  }
  text: string[] // Sanskrit
  synonyms: string
  anthology?: string
  anthologyTitle?: string
  book?: string
  bookTitle: string
  translation: string
  purport: Paragraph[]
  wordCount: number
  wordsReadSoFar: number
}

export interface Verse {
  meta: SearchMeta
  link: string
  text: string[] // Sanskrit
  synonyms: string
  translation: string
}

interface Paragraph {
  type: 'verse' | 'text'
  text: string[]
}

export function verseTitlePartial(verse: Verse) {
  return `${verse.meta.chapterNumber}.${verse.meta.verseNumber}`
}

export function verseTitleFull(verse: Verse) {
  return `${verse.meta.bookTitleRaw}: ${verse.meta.chapterNumber}.${verse.meta.verseNumber}`
}

export function verseOldTitleFull(verse: VerseOld) {
  console.log(verse)
  return `${verse.book}: ${verse.meta.chapter}.${verse.meta.verse}`
}

interface SearchMeta {
  verseId: string
  verseNumber: string

  bookId: string
  bookTitle: string
  bookTitleRaw: string
  bookNumber?: number

  anthologyId?: string
  anthologyTitle?: string
  anthologyTitleRaw?: string

  chapterTitle?: string
  chapterNumber?: string

  order: number
}

function sanitize(str: string = ''): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

function convertBS(verse: VerseOld): Verse {
  return {
    link: verse.link,
    synonyms: verse.synonyms,
    text: verse.text,
    translation: verse.translation,
    meta: {
      bookId: 'bs',
      bookTitle: 'Brahma-saṁhitā',
      bookTitleRaw: 'Bramha-samhita',

      order: verse.meta.order,

      verseNumber: verse.meta.verse,
      verseId: `bs.${verse.meta.verse}`,
    },
  }
}

function convertBG(verse: VerseOld): Verse {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book as string,
      bookTitle: sanitize(verse.bookTitle),
      bookTitleRaw: verse.bookTitle,
      bookNumber: parseInt((verse.book as any).split('.')[1], 10),

      anthologyId: verse.anthology,
      anthologyTitle: 'Bhagavad Gita',
      anthologyTitleRaw: 'Bhagavad-gītā',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter as any,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}

function convertSB(verse: VerseOld): Verse {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book as string,
      bookTitle: sanitize(verse.bookTitle),
      bookTitleRaw: verse.bookTitle,
      bookNumber: parseInt((verse.book as any).split('.')[1], 10),

      anthologyId: verse.anthology,
      anthologyTitle: 'Srimad Bhagavatam',
      anthologyTitleRaw: 'Śrīmad-Bhāgavatam ',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter as any,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}

function convertCC(verse: VerseOld): Verse {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book as string,
      bookTitle: sanitize(verse.bookTitle),
      bookTitleRaw: verse.bookTitle,

      anthologyId: verse.anthology,
      anthologyTitle: 'Chaitanya Charitamrita',
      anthologyTitleRaw: 'Caitanya-caritāmṛta',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter as any,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}
