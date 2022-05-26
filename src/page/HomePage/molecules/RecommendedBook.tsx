import '../styles/AddBook.css';
import { db } from '../../../config/FirebaseConfig'
// import uuid from 'react-uuid'
import { nanoid } from 'nanoid'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react';
import { IBooksData } from '../organoids/HomePage';

interface IBooks {
    booksData: IBooksData[]

}
export const RecommendedBook = (param: IBooks) => {
    const [books, setBooks] = useState<IBooksData[]>([...param.booksData]);

    const findRecommendedBook = (() => {
        let arrayBooks: IBooksData[] = []
        const nowYear = (new Date()).getFullYear()
        books.map(function (book) {
            // @ts-ignore        
            if (book[0].yearOfPublication >= nowYear - 3) {
                // @ts-ignore
                arrayBooks.push(...book)
            }
        })
        // @ts-ignore
        let maxRating = books.reduce((prev, current) => prev.rating > current.rating ? prev : current, {})[0].rating;
        let booksWithMaxRating = arrayBooks.filter(item => item.rating == maxRating);
        const rand = Math.floor(Math.random() * booksWithMaxRating.length);
        // @ts-ignore
        return (
            booksWithMaxRating[rand].name
        )
    })
    return (
        <ul>
            <li>
                Рекомендованная книга
                <ul>
                    <li style={{whiteSpace:'pre-line'}}>{findRecommendedBook()}</li>
                </ul>
            </li>
        </ul>
    )
}