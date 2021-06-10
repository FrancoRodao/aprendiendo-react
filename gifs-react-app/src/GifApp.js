import React, {useState} from 'react'
import AddCategory from "./components/AddCategory";
import { GifGrid} from './components/GifGrid';

export default function GifApp({ initialCategories = [] }) {
    
    const [categories, setCategories] = useState(initialCategories)
    
    return (
        <>
            <h2>Gif App</h2>
            <hr/>
            <AddCategory setCategories={setCategories}></AddCategory>
            <ol>
                {
                    categories.map(category => <GifGrid category={category} key={category}></GifGrid>)
                }
            </ol>
        </>
    )
}
