import { Flashcard } from 'src/types/flashcards'
import { verseTitlePartial } from 'src/types/verse'
import { shuffle } from './shuffle'

export interface SessionOptions {
  type: 'quiz' | 'practice' | 'learn'
  variant: 'random' | 'verse-number' | 'note' | 'sanskrit' | 'english'
  order: 'book-order' | 'proficency' | 'random' | 'chronological'
  cards: 'all' | 'partial'
  selectedCards: Flashcard[]
}

export type Session = {
  flashcard: Flashcard
  prompt: {
    title: string
    subtitle?: string
  }
}[]

export function generateQuiz(session: SessionOptions): Session {
  let cards = session.selectedCards.slice()
  if (session.order === 'book-order') {
    cards.sort((a, b) => a.verse.meta.order - b.verse.meta.order)
  } else if (session.order === 'chronological') {
    cards.sort((a, b) => a.dateAdded - b.dateAdded)
  } else if (session.order === 'proficency') {
    // TODO: sort based on proficency
  } else {
    cards = shuffle(cards)
  }

  const getTitle = ({ verse, notes }: Flashcard): string => {
    const options = shuffle(['verse-number', 'note', 'sanskrit', 'english'])
    const variant = session.variant === 'random' ? options[0] : session.variant

    if (variant === 'english') return verse.translation
    if (variant === 'note') return shuffle(notes)[0] || verseTitlePartial(verse)
    if (variant === 'sanskrit') return verse.translation
    if (variant === 'verse-number') return verseTitlePartial(verse)

    return verseTitlePartial(verse)
  }

  return cards.map((card) => ({
    flashcard: card,
    prompt: {
      title: getTitle(card),
    },
  }))
}
