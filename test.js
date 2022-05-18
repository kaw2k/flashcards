const fs = require('fs')

const bs = require('./src/bs')
const sb = require('./src/sb')
const bg = require('./src/bg')
const cc = require('./src/cc')

function sanitize(str = '') {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

function convertBS(verse) {
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

function convertSB(verse) {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book,
      bookTitle: sanitize(verse.bookTitle),
      bookTitleRaw: verse.bookTitle,
      bookNumber: parseInt(verse.book.split('.')[1], 10),

      anthologyId: verse.anthology,
      anthologyTitle: 'Srimad Bhagavatam',
      anthologyTitleRaw: 'Śrīmad-Bhāgavatam ',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}

function convertCC(verse) {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book,
      bookTitle: sanitize(verse.bookTitle),
      bookTitleRaw: verse.bookTitle,

      anthologyId: verse.anthology,
      anthologyTitle: 'Chaitanya Charitamrita',
      anthologyTitleRaw: 'Caitanya-caritāmṛta',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}

function convertBG(verse) {
  return {
    link: verse.link,
    translation: verse.translation,
    synonyms: verse.synonyms,
    text: verse.text,
    meta: {
      bookId: verse.book,

      bookTitle: 'Bhagavad Gita',
      bookTitleRaw: 'Bhagavad-gītā',

      order: verse.meta.order,

      chapterNumber: verse.meta.chapter,
      chapterTitle: sanitize(verse.meta.chapterTitle),

      verseNumber: verse.meta.verse,
      verseId: verse.id,
    },
  }
}

function write(name, output) {
  fs.writeFileSync(`./${name}.json`, JSON.stringify(output, null, 2))
}

write('bs-new', {
  ...bs,
  verses: bs.verses.map(convertBS),
})

write('bg-new', {
  ...bg,
  verses: bg.verses.map(convertBG),
})

write('cc-new', {
  ...cc,
  verses: cc.verses.map(convertCC),
})

write('sb-new', {
  ...sb,
  verses: sb.verses.map(convertSB),
})
