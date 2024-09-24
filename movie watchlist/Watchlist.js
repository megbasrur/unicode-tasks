import React,{useState, useEffect} from "react";

const Watchlist=()=>{
    const[movies,setMovies]= useState([]);
    const[newTitle,setNewTitle]=useState('');

    useEffect(()=>{
        fetch('http://localhost:8000/movies')
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            setMovies(data);
        })
    },[]);

    useEffect(()=>{
        localStorage.setItem('movies',JSON.stringify(movies));
    },[movies]);

    
    const handleAdd=()=>{
        if(newTitle.trim()){
            const newMovie={
                title:newTitle,
                watched:false
            };
        fetch('http://localhost:8000/movies',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMovie),
        }
        )
        .then(response=>response.json())
        .then(data=> setMovies([...movies,data]))
        setNewTitle('');
        }
    };

    const handleWatched=(id)=>{
        const updated=movies.map((movie)=>{
            if(movie.id===id){
                return {...movie, watched: !movie.watched};
            }
            else
                 return {movie};
        });
    }

    const handleDelete=(id)=>{
        fetch(`$http://localhost:8000/movies/${id}`,{ 
            method: 'DELETE'
        }
        )
        .then(()=>
        setMovies(movies.filter((movie)=> movie.id!==id)))
    };
    
    return(
        <div>
            {movies && movies.map((movie)=>(
                   <div key={movie.id} className="flex items-center">
                    <h1>{movie.title}</h1>
                    <div className="flex flex-row">
                    <p>Watched</p> 
                    <input type="checkbox" checked={movie.watched}/>
                    </div>
                    </div>
                )
            )}
        </div>
        
    )
}

export default Watchlist;