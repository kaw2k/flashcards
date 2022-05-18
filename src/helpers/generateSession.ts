import { Icons } from 'src/components/icon'
import { DATABASE } from 'src/models/state'
import { Flashcard, FlashcardSteps } from 'src/types/flashcards'
import { verseTitleFull } from 'src/types/verse'
import { sample } from './sample'
import { shuffle } from './shuffle'

export const VariantOptions: {
  value: string
  label: string
  icon: Icons
}[] = [
  { value: 'english', label: 'English', icon: 'title' },
  { value: 'verse-number', label: 'Verse Number', icon: 'tag' },
  { value: 'sanskrit', label: 'Sanskrit', icon: 'translate' },
  { value: 'note', label: 'Note', icon: 'sticky_note_2' },
]

export const DefaultVariantOptions: {
  value: string
  label: string
  icon: Icons
}[] = [{ value: 'english', label: 'English', icon: 'title' }]

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
    cards = generateQuizCards()
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

// We always show all cards that are not in review
// We only will show 1/4 to 1/2 of all review cards
export function generateQuizCards(): Flashcard[] {
  const cards = DATABASE.flashcards.flashcards.slice(0)

  function filterCards(step: FlashcardSteps) {
    return cards.filter((card) =>
      step === FlashcardSteps.Initial
        ? card.step === FlashcardSteps.Initial || !card.step
        : card.step === step
    )
  }

  const initialCards = filterCards(FlashcardSteps.Initial)
  const betterCards = filterCards(FlashcardSteps.Better)
  const greatCards = filterCards(FlashcardSteps.Great)
  const reviewCards = filterCards(FlashcardSteps.Review)

  const reviewCardsToShow = Math.max(2, Math.floor(0.33 * reviewCards.length))

  return [
    ...shuffle(initialCards),
    ...shuffle(betterCards),
    ...shuffle(greatCards),
    ...sample(reviewCards, reviewCardsToShow),
  ]
}
