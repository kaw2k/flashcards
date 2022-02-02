import { Icons } from 'src/components/icon'
import { Flashcard } from 'src/types/flashcards'
import { verseTitleFull } from 'src/types/verse'
import { shuffle } from './shuffle'

export const VariantOptions: {
  value: string
  label: string
  icon: Icons
}[] = [
  { value: 'verse-number', label: 'Verse Number', icon: 'tag' },
  { value: 'note', label: 'Note', icon: 'sticky_note_2' },
  { value: 'sanskrit', label: 'Sanskrit', icon: 'translate' },
  { value: 'english', label: 'English', icon: 'title' },
]

type VariantOptions = typeof VariantOptions

export interface SessionOptions {
  type: 'quiz' | 'practice' | 'learn'
  variant: VariantOptions
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

export function generateSession(session: SessionOptions): Session {
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
    const variant = shuffle(session.variant.map((v) => v.value))[0]

    if (variant === 'english') return verse.translation
    if (variant === 'note') return shuffle(notes)[0] || verseTitleFull(verse)
    if (variant === 'sanskrit') return verse.text.join('\n')
    if (variant === 'verse-number') return verseTitleFull(verse)

    return verseTitleFull(verse)
  }

  return cards.map((card) => ({
    flashcard: card,
    prompt: {
      title: getTitle(card),
    },
  }))
}
