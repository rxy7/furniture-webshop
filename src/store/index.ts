import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'
import config from "../../firebase"

Vue.use(Vuex)
firebase.initializeApp(config);

export default new Vuex.Store({
  // STATE ----------------------------------------------------------------------
  state:{
  db: firebase.firestore(),
  user: null,
  loading: false,
  error: null,
  roomTypes: [],
  products: []
  },

// MUTATIONS ----------------------------------------------------------------------
  mutations: {
    setUser(state, payload){
      state.user = payload
    },

    setLoading(state, payload){
      state.loading = payload
    },

    setError(state, payload){
      state.error = payload
    },

    clearError(state){
      state.error = null
    },

    setRoomTypes(state, payload){
      state.roomTypes = payload

    },

    createProduct(state, payload){
      state.products.push(payload)
    }

  },

// ACTIONS ------------------------------------------------------------------------
  actions: {
    signUserIn({commit}, payload){
      commit('setLoading', true)
      commit('ClearError')
      firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
          commit('setLoading', false)
          commit('setUser',user)   
      })
      .catch(function(error) {
      commit('setLoading', false)
      commit('setError', error)

        console.log(error);
      })
    },

    signOut({commit}) {
      firebase
        .auth()
        .signOut()
        .then(()=> {
          commit('setUser',null)
        alert("Logged out!");
        })
        .catch(function(error) {
          console.log(error);
          // An error happened.
        });
    },

    clearError({commit}){
      commit('clearError')
    },

    // getRoomTypes(){
    //   firebase.firestore().collection("Room Type")
    //         .get()
    //         .then(rooms => {
    //           const roomsType =[]

    //           rooms.forEach(room => {
    //             roomsType.push(room)
                
    //           })
    //           commit('setRoomTypes', roomsType)
                
    //         })
    //         .catch(function(error: Error) {
    //           console.log("Error getting document:", error);
    //         });
    // },

    createProduct({commit}, payload){
        const product = {
          roomsType: payload.roomsType,
          color: payload.color,
          description: payload.description,
          discount: payload.discount,
          image: payload.image,
          name: payload.name,
          price: payload.price,
          size: payload.size
        }
        firebase.firestore().collection('Products').doc().set(product)
        .then((data)=>{
          const key = data.key
            console.log(data)
            commit('CreateProduct',{
              ...product,
              id:key
            })

        }).catch((error)=>{
          console.log(error)
        })
    }

    
  },

// MODULES ------------------------------------------------------------------------
  modules: {
  },

// GETTERS ------------------------------------------------------------------------
  getters:{
    user(state){
      return state.user
    },
    loading(state){
      return state.loading
    },
    error(state){
      return state.error
    },
    products(state){
      console.log(state.products);
      return state.products
      
    }

  }
})



// import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

// export default new VuexModule({


// })