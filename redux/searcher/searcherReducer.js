import searcherTypes from './searcherTypes';

const initialState = {
    data: {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
        hasMore: true,
    },
    error: false,
};

const seacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case searcherTypes.SET_ERROR: {
            return { ...state, error: action.payload };
        }
        case searcherTypes.SET_SEARCHER:
            return { ...state, data: { ...action.payload } };
        case searcherTypes.CLEAN_SEARCHER:
            return {
                ...state,
                data: {
                    page: 1,
                    results: [],
                    total_pages: 0,
                    total_results: 0,
                    hasMore: true,
                },
                error: false,
            };
        default:
            return state;
    }
};

export default seacherReducer;
