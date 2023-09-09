const reduxLogger = require("redux-logger") 
const redux = require("redux")



const logger = reduxLogger.createLogger()
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware



const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

// action
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICE_CREAM_ORDERED,
        payload: qty
    }
}
function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty
    }
}


function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}



const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// reducer
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        default:
            return state
    }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }

        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = redux.createStore(rootReducer, applyMiddleware(logger))

console.log("initial state", store.getState())

const unsubscribe = store.subscribe(()=>{})

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream(2)
actions.restockIceCream(2)

unsubscribe()
