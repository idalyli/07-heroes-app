
const {  mount } = require("enzyme")
const { MemoryRouter } = require("react-router-dom")
const { PrivateRoute } = require("../../routers/PrivateRoute")

describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }
    Storage.prototype.setItem=jest.fn();

    test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                 <PrivateRoute
                isAuthenticated={true}
                component={() => <span>Listos</span>}
                {...props}
            />
            </MemoryRouter>      
        );
       // console.log(wrapper.html())
        expect(wrapper.find('span').exists()).toBe(true)
        //localStorage ha sido llamado
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel')
    })
    test('debe bloquear el componente si no esta autenticado', () => {

        const wrapper=mount(
            <MemoryRouter>
                <PrivateRoute
                isAuthenticated={false}
                component={() => <span>Listos</span>}
                {...props}
                
                />
            </MemoryRouter>
        )
        expect(wrapper.find('span').exists()).toBe(false)
        
    })
    


})
