import { Email } from './email'
import { Id } from './id'
import { Verse } from './verse'

type LearningState = 'active' | 'learned' | 'archived'

export type FlashcardType = 'id' | 'sanskrit' | 'english' | 'word'

export interface FlashcardHistory {
  date: number
  type: FlashcardType
  hintNeeded: boolean
  correct: 0 | 1 | 2 | 3 | 4 | 5
  learningState: LearningState
}

export interface Flashcard {
  id: Id
  owner: Email
  verse: Verse
  learningState: LearningState
  history: FlashcardHistory[]
  notes: string[]
  dateAdded: number
}

const Flashcard = (flashcard: Omit<Flashcard, 'id'>): Flashcard => ({
  id: Id(),
  ...flashcard,
})
