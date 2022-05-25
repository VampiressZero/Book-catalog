import '../styles/AddBook.css';
import { db } from '../../../config/FirebaseConfig'
// import uuid from 'react-uuid'
import { nanoid } from 'nanoid'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react';

export const AddBook = () => {
    const [name, setName] = useState('');
    const [authors, setAuthors] = useState('');
    const [rating, setRating] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [ISBN, setISBN] = useState('');
    const writeBookData = (() => {
        let arrayAuthors = authors.split(',')
        arrayAuthors.map(author => author = author.trimStart())
        set(ref(db, 'books/' + nanoid()), {
          name: name,
          authors: arrayAuthors,
          rating : +rating,
          yearOfPublication: +yearOfPublication || null,
          ISBN : ISBN || null
        });
      })
    const clearState = (()=>{
        setName('')
        setAuthors('')
        setRating('')
        setYearOfPublication('')
        setISBN('')
    })
    return (
        <>
            <div className='addBook'>
                <label>Название: 
                    <input 
                        value={name} 
                        onChange={event => setName(event.target.value)} 
                        type="text" />
                </label>
                <label>Автор: 
                    <input 
                        value={authors} 
                        onChange={event => setAuthors(event.target.value)} 
                        type="text" /> если авторов несколько укажите их через запятую
                </label>
                <label>Год публикации: 
                    <input 
                        type="text"
                        value={yearOfPublication} 
                        onChange={event => setYearOfPublication(event.target.value)}  />
                </label>
                <label>Рейтинг: 
                    <input 
                        type="text" 
                        value={rating} 
                        onChange={event => setRating(event.target.value)} />
                </label>
                <label>ISBN: 
                    <input 
                        value={ISBN} 
                        onChange={event => setISBN(event.target.value)} 
                        type="text" />
                </label>
                <button onClick={()=>{writeBookData(); clearState()}}>Добавить книгу</button>
            </div>
        </>
    )
}