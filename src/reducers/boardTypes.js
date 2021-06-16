import {
    ADD_BOARD_TYPE,
    ADD_BOARD_TYPE_VERSIONS,
    ADD_BOARD_TYPES,
    DELETE_BOARD_TYPE,
    EDIT_BOARD_TYPE
} from "../actions/boardTypes";

const initialState = {
    boardTypes: [],
    versions: []
};

export const boardTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOARD_TYPES:
            return {
                ...state,
                boardTypes: action.data
            };
        case ADD_BOARD_TYPE:
            return {
                ...state,
                boardTypes: [...state.boardTypes, action.data]
            };
        case EDIT_BOARD_TYPE:
            return {
                ...state,
                boardTypes: state.boardTypes.map(boardType => boardType.id === action.data.id ? action.data : boardType)
            };
        case DELETE_BOARD_TYPE:
            return {
                ...state,
                boardTypes: state.boardTypes.filter(boardType => boardType.id !== action.data)
            };
        case ADD_BOARD_TYPE_VERSIONS:
            return {
                ...state,
                versions: {
                    ...state.versions,
                    [action.data.id]: action.data.versions
                        .filter(version => version.object)
                        .map(version => {
                            version.object = JSON.parse(version.object)
                            return version;
                        })
                        .reverse()
                }
            }
        default:
            return state;
    }
};
