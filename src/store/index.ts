import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'
import config from "../../firebase"
import router from '@/router'

Vue.use(Vuex)
firebase.initializeApp(config);

export default new Vuex.Store({
  // STATE ----------------------------------------------------------------------
  state:{
  user: null,
  loading: false,
  error: null,
  roomsType: [],
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

    setRoomsType(state, payload){
      state.roomsType = payload

    },

    getProducts(state, payload){
      state.products = payload
    },

    deleteProduct(state, payload){
      const index = state.products.findIndex(product => product.id == payload)
      state.products.splice(index, 1)

    },

    // updateProduct(state, payload){
    //   const item = state.products.find(product => product.id === payload.id);
    //   Object.assign(item, payload);
    // }
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
        });
    },

    clearError({commit}){
      commit('clearError')
    },

    getRoomsType({commit}){
      const roomsType = firebase.firestore().collection("Room Type");


      roomsType.get().then(rooms => {
              const roomsType =[]

              rooms.forEach(room => {
                roomsType.push(room.id)
                
              })
              commit('setRoomsType', roomsType)
                
            })
            .catch(function(error: Error) {
              console.log("Error getting document:", error);
            });

      
    },

    createProduct({commit}, payload){
      // debugger;
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
        
        const products = firebase.firestore().collection('Products').doc()
        products.set(product)
        .then(()=>{
          // const key = doc.id
          //   console.log(key)
            // commit('CreateProduct',{
            //   ...product,
            //   id:key
            // })

        }).catch((error)=>{
          console.log(error)
        })
    },

     getProducts({commit}){
      commit('setLoading',true)
        const products = firebase.firestore().collection("Products");

        products.get().then((snapshot) => {
            if (snapshot.docs) {
              
                const products = []
                snapshot.docs.forEach(doc => {
                  const id = doc.id
                  const data = {id:id, data: doc.data() }
                  products.push(data)

                });
                commit('getProducts', products)
                commit('setLoading',false)


            } else {

                console.log("No documents!");
                commit('setLoading',false)

            }
        }).catch(function(error) {
            console.log("Error getting documents:", error);
            commit('setLoading',false)

        });
    },

    deleteProduct({commit}, payload){
      const products = firebase.firestore().collection("Products");
     debugger;
      products.doc(payload).delete().then(function() {
        console.log("Document successfully updated!");
        commit('deleteProduct', payload)
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    })
    },

    updateProduct({commit}, payload){
      const products = firebase.firestore().collection("Products");
      // debugger;
      const product = {
        roomsType: payload.product.roomsType,
        color: payload.product.color,
        description: payload.product.description,
        discount: payload.product.discount,
        image: payload.product.image,
        name: payload.product.name,
        price: payload.product.price,
        size: payload.product.size
      }
      products.doc(payload.productID).update(product).then(function() {
        console.log("Document successfully deleted!");
        commit('updateProduct', payload)
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    })
    },
  
    autoSignIn({commit}, payload){
      commit('setUser', {id: payload.uid, products: []})
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
      console.log(state.loading)

      return state.loading
    },
    error(state){
      return state.error
    },
    products(state){
      console.log(state.products)
      return state.products
    },
    roomsType(state){
      console.log(state.roomsType)

      return state.roomsType
    }

  }
})



// import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

// export default new VuexModule({


// })