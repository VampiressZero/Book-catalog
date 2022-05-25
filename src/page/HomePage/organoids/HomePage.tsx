import '../styles/HomePage.css';
import { db } from '../../../config/FirebaseConfig';
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react';
import { AddBook } from '../molecules/AddBook'
interface IBooksData {
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
            // convertedData && convertedData.sort(function (prev, next) {
            //     console.log(next.name, next.yearOfPublication)
            //     return prev.yearOfPublication - next.yearOfPublication;
            // });
            //Сортируем по году
            // convertedData && convertedData.sort(function(prev, next){
            //     if(prev.yearOfPublication == next.yearOfPublication)
            //     {
            //         return (prev.name < next.name) ? -1 : (prev.name > next.name) ? 1 : 0;
            //     }
            //     else
            //     {
            //         return (prev.yearOfPublication < next.yearOfPublication) ? -1 : 1;
            //     }
            // });
            // convertedData.sortBy()
            // convertedData.reverse()
            
        });
    }, [])


    const sort = ((booksData: any) => {
        let arrayBook: any[] = []
        booksData && booksData.sort(function (prev: { yearOfPublication: number; }, next: { name: any; yearOfPublication: number; }) {
            return prev.yearOfPublication - next.yearOfPublication;
        });
        booksData.reverse()
        while (booksData.length != []) {
            let year = booksData[0].yearOfPublication
            arrayBook.push(booksData.filter((book: { yearOfPublication: any; }) => book.yearOfPublication == year))
            booksData = booksData.filter((book: { yearOfPublication: any; }) => book.yearOfPublication != year)
        }
        for (let i = 0; i < arrayBook.length; i++) {
            if (arrayBook[i][0].yearOfPublication == null) {
                console.log(arrayBook[i][0])
                arrayBook.push(arrayBook[i])
                let a = arrayBook.splice(i, 1);
                console.log(a)
                break
            }

        }
        arrayBook.forEach(book => {
            if (book[0].yearOfPublication == null) {

            }
            console.log(book)
        });
        arrayBook.map(function (item, i) {
            item.sort(function (prev: { name: string; }, next: { name: string; }) {
                if (prev.name < next.name) { return -1; }
                if (prev.name > next.name) { return 1; }
                return 0;
            })
        })
        
        // booksData  = [].concat.apply([], arrayBook);
        booksData =arrayBook
        setBooks(booksData)
    })
    return (
        <div className='homePage'>
            <div style={{textAlign: 'left'}}>
                {books ? books.map(function (groupBook,i) {
                    console.log(groupBook)
                    return (
                        <ul>                    
                        {/* @ts-ignore: Unreachable code error */}
                            <li key={i}>{groupBook[0].yearOfPublication || 'Книги без указания года'}</li>    
                            <ul>               
                        {// @ts-ignore: Unreachable code error
                        groupBook.map(function(book, j){
                            return(
                                <li key={j}>{book.name}</li>
                            )
                            
                        })  } </ul> 
                        </ul>
                    )
                }) : <p>Упс... Книг нету</p>}

            </div>
            <AddBook />
        </div>
    )
}