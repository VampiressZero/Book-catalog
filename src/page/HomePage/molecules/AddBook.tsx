import '../styles/AddBook.css';
import { db } from '../../../config/FirebaseConfig'
// import uuid from 'react-uuid'
import { nanoid } from 'nanoid'
import { ref, set } from 'firebase/database'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const AddBook = () => {
    const [name, setName] = useState('');
    const [authors, setAuthors] = useState('');
    const [rating, setRating] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [ISBN, setISBN] = useState('');
    const [errorOutput, setErrorOutput] = useState('');


    const writeBookData = (() => {
        let arrayAuthors = authors.split(',')
        arrayAuthors.map(author => author = author.trimStart())
        console.log(name.length)

        if (name.length >= 100) {
            setErrorOutput('Название не может превышать 100 символов')
        }
        else if (!authors.trimStart()) {
            setErrorOutput('Введите автора')
        }
        else if (+yearOfPublication <= 1800 && yearOfPublication) {
            setErrorOutput('Введите год больше 1800')
        }
        else {
            setErrorOutput('')
            clearState()
            set(ref(db, 'books/' + nanoid()), {
                name: name,
                authors: arrayAuthors,
                rating: +rating,
                yearOfPublication: +yearOfPublication || null,
                ISBN: ISBN || null
            });
        }

    })
    const clearState = (() => {
        setName('')
        setAuthors('')
        setRating('')
        setYearOfPublication('')
        setISBN('')
    })
    return (
        <>
            <div className='addBook'>
                <p>Название:</p>
                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        type="text" />
                
                <p>Автор:
                    <span style={{ fontSize: '0.7em' }}> если авторов несколько укажите их через запятую</span>
                </p>
                
                    <input
                        value={authors}
                        onChange={event => setAuthors(event.target.value)}
                        type="text" />
                
                        
                <p>Год публикации:</p>
                    <input
                        type="text"
                        value={yearOfPublication}
                        onChange={event => setYearOfPublication(event.target.value)} />
                
                <p>Рейтинг:</p>
                    <input
                        type="text"
                        value={rating}
                        onChange={event => setRating(event.target.value)} />
                
                <p>ISBN: </p>
                    <input
                        value={ISBN}
                        onChange={event => setISBN(event.target.value)}
                        type="text" />
               
                <p style={{ color: 'red', fontSize: '0.75em' }}>{errorOutput}</p>

                <button onClick={() => { writeBookData() }}>Добавить книгу</button>
            </div>
        </>
    )
}