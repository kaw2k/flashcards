const fs = require('fs')

const bs = require('./src/bs')
const sb = require('./src/sb')
const bg = require('./src/bg')
const cc = require('./src/cc')

function convertBS(verses) {
  return {
    bookId: 'bs',
    id: 'bs',
    type: 'book',
    bookTitle: 'Brahma-saṁhitā',
    bookTitleRaw: 'Bramha-samhita',
    anthologyId: '',
    chapters: [],
  }
}

function convertAnthology(verses) {
  return {
    type: 'anthology',
    anthologyId: verses[0].meta.anthologyId,
    id: verses[0].meta.anthologyId,
    anthologyTitle: verses[0].meta.anthologyTitle,
    anthologyTitleRaw: verses[0].meta.anthologyTitleRaw,
    books: verses.reduce((books, verse) => {
      // We need a new book
      if (verse.meta.bookId !== books[books.length - 1]?.bookId) {
        return books.concat({
          bookId: verse.meta.bookId,
          id: verse.meta.bookId,
          type: 'book',
          bookTitle: verse.meta.bookTitle,
          bookTitleRaw: verse.meta.bookTitleRaw,
          anthologyId: verse.meta.anthologyId,
          chapters: [],
        })
      }

      const currentBook = books[books.length - 1]

      // We need a new chapter
      if (
        verse.meta.chapterNumber !==
        currentBook.chapters[currentBook.chapters.length - 1]?.chapterNumber
      ) {
        books[books.length - 1].chapters = books[
          books.length - 1
        ].chapters.concat({
          chapterNumber: verse.meta.chapterNumber,
          chapterTitle: verse.meta.chapterTitle,
        })
      }

      return books
    }, []),
  }
}

function convertBG(verses) {
  return {
    type: 'book',
    bookId: 'bg',
    id: 'bg',
    bookTitle: 'Bhagavad Gita',
    bookTitleRaw: 'Bhagavad-gītā',
    anthologyId: '',
    chapters: verses.reduce((memo, verse) => {
      const currentChapter = memo[memo.length - 1]

      if (verse.meta.chapterNumber !== currentChapter?.chapterNumber) {
        return memo.concat({
          chapterNumber: verse.meta.chapterNumber,
          chapterTitle: verse.meta.chapterTitle,
        })
      }
      return memo
    }, []),
  }
}

function write(name, output) {
  fs.writeFileSync(`./${name}.json`, JSON.stringify(output, null, 2))
}

write('bg-index', convertBG(bg.verses))
write('bs-index', convertBS(bs.verses))
write('sb-index', convertAnthology(sb.verses))
write('cc-index', convertAnthology(cc.verses))

// write('cc-new', {
//   ...cc,
//   verses: cc.verses.map(convertCC),
// })

// write('sb-new', {
//   ...sb,
//   verses: sb.verses.map(convertSB),
// })
