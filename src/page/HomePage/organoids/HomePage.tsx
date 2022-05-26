import '../styles/HomePage.css';
import { db } from '../../../config/FirebaseConfig';
import { getDatabase, onValue, ref, set, remove } from 'firebase/database'
import { useEffect, useState } from 'react';
import { AddBook } from '../molecules/AddBook'
import { RecommendedBook } from '../molecules/RecommendedBook';
export interface IBooksData {
    name: string,
    ISBN: string,
    authors: string,
    rating: number,
    yearOfPublication: number,
    id: string

}
export const HomePage = () => {
    const [books, setBooks] = useState<IBooksData[]>();

    useEffect(() => {
        const booksDb = ref(db, 'books/');
        onValue(booksDb, (snapshot) => {
            const data = snapshot.val();
            let convertedData: IBooksData[] = Object.values(data)
            const dataKey = Object.keys(data)
            convertedData.map(function (book: IBooksData, i) {
                book.id = dataKey[i]
            })
            sort(convertedData)
        });
    }, [])


    const sort = ((booksData: any) => {
        let arrayBook: any[] = []
        booksData && booksData.sort(function (prev: { yearOfPublication: number; }, next: { name: string; yearOfPublication: number; }) {
            return prev.yearOfPublication - next.yearOfPublication;
        });
        booksData.reverse()
        while (booksData.length != []) {
            let year = booksData[0].yearOfPublication
            arrayBook.push(booksData.filter((book: { yearOfPublication: number; }) => book.yearOfPublication == year))
            booksData = booksData.filter((book: { yearOfPublication: number; }) => book.yearOfPublication != year)
        }
        for (let i = 0; i < arrayBook.length; i++) {
            if (arrayBook[i][0].yearOfPublication == null) {
                arrayBook.push(arrayBook[i])
                let a = arrayBook.splice(i, 1);
                break
            }

        }
        arrayBook.map(function (item, i) {
            item.sort(function (prev: { name: string; }, next: { name: string; }) {
                if (prev.name < next.name) { return -1; }
                if (prev.name > next.name) { return 1; }
                return 0;
            })
        })

        // booksData  = [].concat.apply([], arrayBook);
        booksData = arrayBook
        setBooks(booksData)
    })
    const removeBook = ((id: { id: string; }) => {
        remove(ref(db, 'books/' + id))
        // ref(remove(db, 'users/'))
        // db.ref('books/');
        // // const bookRef  = ref(db,`books/${id}/`)
        // db.child(itemToRemove).remove();
        // bookRef.remove()

    })
    return (
        <div className='homePage'>
            <div style={{ textAlign: 'left', maxWidth:'50%'}}>
                {books ? <RecommendedBook booksData={books} />: <></>}
                
                {books ? books.map(function (groupBook, i) {
                    return (
                            <ul>
                                {/* @ts-ignore: Unreachable code error */}
                                <li key={i}>{groupBook[0].yearOfPublication || 'Книги без указания года'}</li>

                                <ul>
                                    {// @ts-ignore: Unreachable code error
                                        groupBook.map(function (book, j) {
                                            return (
                                                <>
                                                    <li key={j} >{book.name}</li>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <button onClick={() => removeBook(book.id)}>Удалить</button>
                                                </>
                                            )

                                        })} </ul>
                            </ul>
                    )
                }) : <p>Загрузка</p>}

            </div>
            <AddBook />
        </div>
    )
}