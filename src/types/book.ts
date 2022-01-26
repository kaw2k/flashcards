export interface Book {
  id: string
  anthology?: string
  anthologyTitle?: string
  title: string
  type: 'poem' | 'prose'
  totalWords: number
  totalVerses?: number

  chapters: {
    title: string
    number: string // simple number
    verses: string[]
  }[]

  link: string
}
