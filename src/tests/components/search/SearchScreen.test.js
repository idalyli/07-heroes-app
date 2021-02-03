const { mount } = require("enzyme");
const { MemoryRouter, Route } = require("react-router-dom");
import { SearchScreen } from "../../../components/search/SearchScreen";


describe('Pruebas en SearchScreen', () => {

    test('debe de mostrarse correctamente, con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>

        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Searh a hero')
    });
    test('debe de mostrar a Batman y el inpunt con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    })
    test('debe de mostrar un eerror si no se encuentra el Hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batman123');
        expect(wrapper).toMatchSnapshot();
    })
    test(' debe de llamar el push del history', () => {
        const historyMock = {
            push: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route
                    path='/search'
                    component={() => <SearchScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change',
            {
                target: {
                    name: 'searchText',
                    value: 'batman'
                }
            });
            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            });
            expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`)

    })






})
