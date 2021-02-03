const { mount } = require("enzyme")
import '@testing-library/jest-dom';
const { MemoryRouter, Router } = require("react-router-dom")
const { AuthContext } = require("../../auth/AuthContext")
const { Navbar } = require("../../components/ui/Navbar")
const { types } = require("../../types/types")

describe('Pruebas en <Navbar />', () => {

    //extraer el history'es lo que se llama a traves de router'
    // se puede validar configurar para saber si una funcion fue llamada o no
    const historyMock={
        push:jest.fn(),
        replace:jest.fn(),
        location:{},
        listen:jest.fn(),
        createHref:jest.fn()
    }
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "Magadalena"
        }
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>

                <Navbar ></Navbar>
                </Router>
               
            </MemoryRouter>

        </AuthContext.Provider>

    );
    //siempre al usar cualquier tipo de mock limpiarlo
afterEach(()=>{
    jest.clearAllMocks();

})

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe("Magadalena");

    });
    test('debe de llamar el logaut y usar history', () => {

       
        //simular el click
        wrapper.find('button').prop('onClick')();

         //llamar el dispatch
         expect(contextValue.dispatch).toHaveBeenCalledWith({type:types.logout});
         expect(historyMock.replace).toHaveBeenCalledWith('/login')
        
    })
    


})
