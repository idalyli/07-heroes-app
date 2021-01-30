const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");


describe('Pruebas en authReducer', () => {

    const user = {
        name:"",
        logged:false
    }
    test('Deber retorna el estado inicial por defecto ', () => {
       
        const state = authReducer(user, {})
        expect(state).toEqual(user)

    });

     test('debe de autenticar y colocar el name del usuario', () => {
      
        const action={
            type:types.login,
            payload:{name:"Pelkas"}
        }
        const state=authReducer(user,action)
       
        expect(state.logged).toBe(true)
        expect(state).toEqual({name:"Pelkas",
            logged:true
        })



    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const action={
            type:types.logout,
        }

        const state=authReducer({logged:true,name:"Pedro"},action)
        console.log(state)
       // expect(state).toBe({logged:false})
        expect(state).toEqual({logged:false})

    })

 


})
