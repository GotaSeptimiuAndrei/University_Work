import { useContext } from 'react';
import { MovieContext } from '../../contexts/MovieContext.tsx';
import { BarChart } from '@mui/x-charts';
import { Layout } from '../../shared_components/layout/Layout';

export default function ChartPage() {
    document.title = 'Genre Chart';
    const movieContext = useContext(MovieContext)!;
    const moviesList = movieContext.movies;

    const genreMap = new Map<string, number>();

    moviesList.forEach((currentMovie) => {
        if (genreMap.get(currentMovie.getGenre()) === undefined) genreMap.set(currentMovie.getGenre(), 1);
        else genreMap.set(currentMovie.getGenre(), genreMap.get(currentMovie.getGenre())! + 1);
    });

    console.log(genreMap);

    return (
        <Layout>
            <BarChart
                xAxis={[
                    {
                        id: 'Genre',
                        data: [...genreMap.keys()],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [...genreMap.values()],
                        color: 'red', // Set a single color for all bars
                    },
                ]}
                width={500}
                height={300}
            />
        </Layout>
    );
}