import { call, put, takeEvery, all } from 'redux-saga/effects'

function* testSaga() {
    yield takeEvery('TEST_ACTION', workTest);
}

function* workTest(action : any) {
    const response = yield call(testCall, action.payload);
}

function testCall(payload: any) : any {
    
}

export default function* sagasList() {
    yield all([
        
    ])
}