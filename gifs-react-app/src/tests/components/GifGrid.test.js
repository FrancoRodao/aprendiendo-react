import React from 'react'
import useFetchGifs from '../../hooks/useFetchGifs'
import { shallow } from "enzyme"
import { GifGrid } from "../../components/GifGrid";
jest.mock('../../hooks/useFetchGifs');

describe('GifGrid test component', () => {

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    let category = "coding"
    useFetchGifs.mockReturnValue({
        gifs: [],
        loading: true
    })
    let wrapper = shallow(<GifGrid category={category}/>)

    test('should display snapshot correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should show items when gifs are loaded', () => {
        const gifs = [{
            id: 'ABC',
            url: 'https://localhost/cualquier/cosa.jpg',
            title: 'Cualquier cosa'
        },
        {
            id: '123',
            url: 'https://localhost/cualquier/cosa.jpg',
            title: 'Cualquier cosa'
        }]

        useFetchGifs.mockReturnValue({
            gifs,
            loading: false
        })
        const wrapper = shallow(<GifGrid category={category}/>)
        expect(wrapper.find("GifGridItem").length).toBe(gifs.length)
    })
    
})
