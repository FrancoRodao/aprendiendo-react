import { clearErrorsAction, errorAction, finishLoadingAction, startLoadingAction } from "../../../redux/actions/uiActions"
import { types } from "../../../redux/types/types"

describe('uiActions tests', () => {
    
    test('error action test', () => {
        const _errorAction = errorAction(true, 'an error')
        const clearErrorAction = clearErrorsAction()

        expect(_errorAction).toEqual({
            type: types.uiError,
            payload: {
                state: true,
                lastMsg: 'an error'
            }
        })

        expect(clearErrorAction).toEqual({
            type: types.uiError,
            payload: {
                state: false,
                lastMsg: ""
            }
        })

        const startLoading = startLoadingAction()
        const finishLoading = finishLoadingAction()

        expect(startLoading).toEqual({
            type: types.uiStartLoading,
            payload: {
                loading: true
            }
        })

        expect(finishLoading).toEqual({
            type: types.uiFinishLoading,
            payload: {
                loading: false
            }
        })

    })

})
