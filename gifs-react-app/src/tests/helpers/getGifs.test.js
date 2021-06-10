import getGifs from "../../helpers/getGifs"

describe('getGifs test helper', () => {

    test('should get 20 elements', async () => {

        const gifs = await getGifs("coding")
        expect(gifs).toHaveLength(20)

    })
    
})
