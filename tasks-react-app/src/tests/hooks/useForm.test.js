import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../hooks/useForm'

describe('useForm tests', () => {
    test('should return default values', () => {
        const { result } = renderHook(() => useForm())
        const [values, handleInputChange] = result.current
        expect(values).toStrictEqual({})
        expect(typeof handleInputChange).toBe('function')
    })
    
    test('should return the initial state', () => {
        const initialState = {
            title: "testing hooks",
            desc: "I dont like testing",
            done: false
        }
        const { result } = renderHook(() => useForm(initialState))
        const [values, handleInputChange] = result.current
        expect(values).toBe(initialState)
        expect(typeof handleInputChange).toBe('function')
    })
    
    test('should return the new values when input change', () => {
        const initialState = {
            title: "testing hooks",
            desc: "I dont like testing",
            done: false
        }
        const { result } = renderHook(() => useForm(initialState))
        const [ , handleInputChange] = result.current

        act(()=>{
            handleInputChange({
                target: {
                    name: "title",
                    value: "test another thing",
                }
            })
        })

        const [values] = result.current

        expect(values).toStrictEqual({
            ...initialState,
            title: "test another thing"
        })
    })

    test('should return the new value of checkbox when change (using checkbox validation)', () => {
        const initialState = {
            title: "testing hooks",
            desc: "I dont like testing",
            done: false
        }
        const { result } = renderHook(() => useForm(initialState))
        const [ , handleInputChange] = result.current

        act(()=>{
            handleInputChange({
                target: {
                    name: "done",
                    value: "on",
                    checked: true
                }
            })
        })
        
        const [values] = result.current

        expect(values).toStrictEqual({
            ...initialState,
            done: true
        })
    })
})
