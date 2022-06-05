import {
  fetchDelete,
  fetchGetJSON,
  fetchPostJSON,
} from 'src/helpers/apiHelpers'
import { FlashcardsRequest } from 'src/pages/api/flashcards'
import { FlashcardsRequestPost } from 'src/pages/api/flashcards/[id]'
import { Email } from 'src/types/email'
import { Flashcard } from './types/flashcards'
import { Verse } from 'src/types/verse'

// =====================================
// EMAIL
// =====================================
const EMAIL_KEY = 'gita-cards-email'
let _email: Email = Email('')
export const USER = {
  get email() {
    return _email
  },

  set email(email: Email) {
    _email = email
    localStorage.setItem(EMAIL_KEY, _email)
  },

  init() {
    this.email = (localStorage.getItem(EMAIL_KEY) || '') as Email
  },

  logout() {
    this.email = Email('')
  },
}

// =====================================
// FLASHCARDS
// =====================================
const FLASHCARD_KEY = 'gita-cards-flashcards'
let _flashcards: Flashcard[] = []
export const FLASHCARDS = {
  flashcard(id: Flashcard['id']) {
    return this.flashcards.find((f) => f.id === id)
  },

  get flashcards() {
    return _flashcards
  },

  set flashcards(flashcards: Flashcard[]) {
    _flashcards = flashcards
    _flashcards.sort((a, b) => a.verse.meta.order - b.verse.meta.order)
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(_flashcards))
  },

  async update(flashcard: Flashcard) {
    if (this.flashcards.find((f) => f.id === flashcard.id)) {
      this.flashcards = this.flashcards.map((f) => {
        return f.id === flashcard.id ? flashcard : f
      })
    } else {
      this.flashcards = this.flashcards.concat(flashcard)
    }

    const body: FlashcardsRequestPost = { flashcard }
    fetchPostJSON(`/api/flashcards/${flashcard.id}`, body)
  },

  async remove(flashcard: Flashcard) {
    this.flashcards = this.flashcards.filter((f) => f.id !== flashcard.id)
    fetchDelete(`/api/flashcards/${flashcard.id}`)
  },

  hasVerse(targetVerse: Verse) {
    return !!this.flashcards.find(
      ({ verse }) => verse.meta.verseId === targetVerse.meta.verseId
    )
  },

  async init(email?: Email) {
    this.flashcards = JSON.parse(
      localStorage.getItem(FLASHCARD_KEY) || '[]'
    ) as Flashcard[]

    if (email) {
      const body: FlashcardsRequest = { email }
      this.flashcards =
        (await fetchGetJSON<Flashcard[]>('/api/flashcards', body)) || []
    } else {
      this.flashcards = []
    }
  },

  logout() {
    this.flashcards = []
  },
}

// =====================================
// DATABASE
// =====================================
export const DATABASE = {
  user: USER,
  flashcards: FLASHCARDS,

  async init() {
    this.user.init()
    await this.flashcards.init(this.user.email)
  },

  logout() {
    this.user.logout()
    this.flashcards.logout()
  },
}
