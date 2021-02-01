const { mount, shallow } = require("enzyme")
const { MemoryRouter } = require("react-router-dom")
const { AuthContext } = require("../../auth/AuthContext")
const { DashboardRoutes } = require("../../routers/DashboardRoutes")

describe('Pruebas en <DashboardRoutes />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Idaly'
        }
    }
    test('debe mostrarse correctamente ', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider >
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Idaly')
    })

})
