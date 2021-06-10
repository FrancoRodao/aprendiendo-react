import { renderHook } from "@testing-library/react-hooks"
import useFetchGifs from "../../hooks/useFetchGifs"

describe('useFetch gif tests', () => {

    const category = "testing"
    
    test('should return inital state', async () => {
        const { result, waitForNextUpdate } = renderHook(()=> useFetchGifs(category))
        const  {gifs, loading} = result.current

        await waitForNextUpdate();

        expect( gifs ).toEqual([]);
        expect( loading ).toBe(true);
    })

    test('should return a array of gifs and loading in false', async () => {
        const { result, waitForNextUpdate } = renderHook( () => useFetchGifs(category) );
        await waitForNextUpdate();

        const { gifs, loading } = result.current;

        expect( gifs.length ).toBe( 20 );
        expect( loading ).toBe( false );
    })
    
})
