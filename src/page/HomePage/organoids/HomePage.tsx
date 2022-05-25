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
    ISyearOfPublicationBN: number,
    id: string

}
export const HomePage = () => {
    const [books, setBooks] = useState<IBooksData[]>();

    useEffect(()=>{
        const booksDb = ref(db, 'books/');
        onValue(booksDb, (snapshot) => {
        const data = snapshot.val();
        const convertedData:IBooksData[] = Object.values(data) 
        const dataKey = Object.keys(data) 

        convertedData.map(function(book:IBooksData, i){
            book.id = dataKey[i]
        })
        setBooks(convertedData)
        });
    },[])
    return (
        <div className='homePage'>
            <div>
                {books ? books.map(function(book, i){
                    console.log(book.name)
                    return(
                        <p key={i}>{book.name}</p>
                    )
                }) : <p>Упс... Книг нету</p>}
                
            </div>
            <AddBook />
        </div>
    )
}