import React, {Component} from 'react';
import MoviesData from '../moviesData';
import MovieItem from '../MovieItem';
import {API_URL,API_KEY_3} from '../../api';


class App extends Component {
    constructor(){
        super();
        this.state = {
            movies: MoviesData,
            moviesWillWatch: []
        }
        console.log("constructor")
    }

    componentDidMount(){
        console.log("didMount")
        fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=popularity.desc`).then((response)=>{
            console.log('then')
            return response.json()
        }).then((data)=>{ 
            console.log("data",data)
            this.setState({
                movies: data.results
            })
        })
       
    }

    removeMovie = (movie) => {
        const updateMovies = this.state.movies.filter((item)=>{
               return item.id !== movie.id;
        });
        // console.log(updateMovies);
        this.setState({
            movies: updateMovies
           
            
        })
    }
    addMovieToWillWatch = movie => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch];
        updateMoviesWillWatch.push(movie);
        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        })
    }
    removeMovieFromWillWatch = (movie) => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter((item)=>{
               return item.id !== movie.id;
        });
        this.setState({
            moviesWillWatch: updateMoviesWillWatch  
        })
    }
  render(){
    console.log("render")
    return (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            {this.state.movies.map(movie=>{
                                
                                return( 
                                    <div className="col-6 mb-4"key={movie.id}>
                                    <MovieItem movie={movie}
                                    removeMovie = {this.removeMovie}
                                    addMovieToWillWatch = {this.addMovieToWillWatch}
                                    removeMovieFromWillWatch = {this.removeMovieFromWillWatch}
                                    />
                                    </div>
                                ) 
                            })}
                        </div>
                    </div>
                        <div className="col-3">
                            <p>Will watch:{this.state.moviesWillWatch.length}</p>
                        </div>
                </div>
            </div>
        )
    }
}

export default App;