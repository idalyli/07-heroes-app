import { mount } from "enzyme";


import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Pruebas en <LoginScreen />', () => {


    const historyMock = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),

    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>

            <LoginScreen history={historyMock} />

        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente ', () => {
        //snapshot

        expect(wrapper).toMatchSnapshot();

    });

    test('debe realizar el dispatch y la navegacion', () => {
        // se hace la referencia a una funcion
        const handleClick = wrapper.find('button').prop('onClick');
        //llamar la funcion
        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: "Pelkas" }
        }

        );
        expect(historyMock.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc')
        handleClick()
        expect(historyMock.replace).toHaveBeenCalledWith('/dc');


    })



})
