import AddTask from "../../components/AddTask";
const { shallow } = require("enzyme")

describe('AddTask tests', () => {
    test('should display component correctly', () => {
        const formValues = {
            title: "task title",
            desc: "task desc",
            done: false
        }
        const wrapper = shallow(<AddTask values={formValues} />)
        expect(wrapper).toMatchSnapshot()
    })
    
})
