import  '@testing-library/jest-dom';
import { shallow } from "enzyme"
import { GifGridItem } from "../../components/GifGridItem";

describe("GifGridItem test component", ()=>{

    const title = "titleTest"
    const url = "http://localhost/test"
    let wrapper = shallow(<GifGridItem title={title} url={url}></GifGridItem>)

    test('should display the snapshot correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

})