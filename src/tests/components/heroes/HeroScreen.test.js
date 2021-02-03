const { mount } = require("enzyme")
const { MemoryRouter, Route } = require("react-router-dom")
const { HeroeScreen } = require("../../../components/heroes/HeroeScreen")

describe('Pruebas en <HeroScreen />', () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()

    }

    test('Debe el componente <Redirect /> si no hay argumentos en el URL ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroeScreen history={historyMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('Redirect').exists()).toBe(true)
    });
    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                <Route path="/hero/:heroeId" component={HeroeScreen} />
            </MemoryRouter>
        )
        expect(wrapper.find('.row').exists()).toBe(true);
    })
    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()

        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />}
                />
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledWith('/')
        expect(historyMock.goBack).not.toHaveBeenCalled()

    })
    test('debe de regresar a la pantalla anterior GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />}
                />
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledTimes(0)
        expect(historyMock.goBack).toHaveBeenCalled()

        
    })
    test('debe de llamar el Redirect si el hero no existe ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain222']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />}
                />
            </MemoryRouter>
        )
       
        expect(wrapper.find('Redirect').exists()).toBe(false);
        expect(wrapper.text()).toBe('')
        
    })
    
    

    




})
