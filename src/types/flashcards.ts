import { Email } from './email'
import { Id } from './id'
import { Verse } from './verse'

export interface FlashcardHistory {
  date: number
  ease: number
  step: FlashcardSteps
  option: FlashcardOptions
}

export interface Flashcard {
  id: Id
  owner: Email
  verse: Verse
  step: FlashcardSteps
  ease: number
  history: FlashcardHistory[]
  notes: string[]
  dateAdded: number
}

const Flashcard = (flashcard: Omit<Flashcard, 'id'>): Flashcard => ({
  id: Id(),
  ...flashcard,
})

export const FlashcardHistoryDefault = (): FlashcardHistory => ({
  date: Date.now(),
  step: FlashcardSteps.Initial,
  ease: 0,
  option: FlashcardOptions.Again,
})

export enum FlashcardOptions {
  Again = 'again',
  Hard = 'hard',
  Good = 'good',
  Easy = 'easy',
}

export enum FlashcardSteps {
  Initial,
  Better,
  Great,
  Review,
}

function optionEaseValue(option: FlashcardOptions): number {
  if (option === FlashcardOptions.Hard) return 0.85
  if (option === FlashcardOptions.Good) return 1
  if (option === FlashcardOptions.Easy) return 1.15

  return 0
}

function nextStep(currentStep: FlashcardSteps): FlashcardSteps {
  if (currentStep === FlashcardSteps.Initial) return FlashcardSteps.Better
  if (currentStep === FlashcardSteps.Better) return FlashcardSteps.Great
  if (currentStep === FlashcardSteps.Great) return FlashcardSteps.Review

  return FlashcardSteps.Review
}

export function progressCard(
  option: FlashcardOptions,
  step: FlashcardSteps,
  ease: number
): FlashcardHistory {
  if (ease) {
    const nextEase = ease * optionEaseValue(option)

    if (option === FlashcardOptions.Again || nextEase < 0.75) {
      return {
        ease: 0,
        date: Date.now(),
        option,
        step: FlashcardSteps.Initial,
      }
    }

    return {
      ease: nextEase,
      date: Date.now(),
      option,
      step: FlashcardSteps.Review,
    }
  }

  if (option === FlashcardOptions.Again) {
    return {
      date: Date.now(),
      ease: 0,
      option,
      step: FlashcardSteps.Initial,
    }
  }

  if (option === FlashcardOptions.Hard) {
    return {
      date: Date.now(),
      ease: 0,
      option,
      step: step,
    }
  }

  if (option === FlashcardOptions.Good) {
    return {
      date: Date.now(),
      ease: 0,
      option,
      step: nextStep(step),
    }
  }

  if (option === FlashcardOptions.Easy) {
    return {
      date: Date.now(),
      ease: 1,
      option,
      step: FlashcardSteps.Review,
    }
  }

  return {
    date: Date.now(),
    ease: ease,
    option: option,
    step: step,
  }
}
