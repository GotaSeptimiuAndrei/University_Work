import {createContext} from 'react';
import {MovieContextType, MovieProviderType} from '../types/MovieContextTypes.types.ts';

export const MovieContext = createContext<MovieContextType | null>(null);

function MoviesContextProvider({movieContext, children}: MovieProviderType) {
    return (
        <MovieContext.Provider value={movieContext}>
            {children}
        </MovieContext.Provider>
    );
}

export {MoviesContextProvider};
