import './App.css';
import React, {useEffect, useState} from 'react';
import Watchlist from './Watchlist';
import logo from './logo.png';
import film from './film.png';
import Swal from 'sweetalert2';

function App() {
  
  const[movies,setMovies]= useState([]);
  const[newTitle,setNewTitle]=useState('');
  const[form, setForm]=useState(false);
 // const[blur,setBlur]=useState(false);

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
      handleHideForm();
      }
  };

  const handleShowForm=()=>{
    setForm(true);
  };

  const handleHideForm=()=>{
    setForm(false);
  };

 

  const deleteMovie=(movie)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10d007',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Item deleted');
      handleDelete(movie.id);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }})
  }

  const handleDelete=(id)=>{
      fetch(`http://localhost:8000/movies/${id}`,{ 
          method: 'DELETE'
      }
      )
      .then(()=>
      setMovies(movies.filter((movie)=> movie.id!==id)))
  };

  const handleWatched=(id)=>{
    const updatedList=movies.map((movie)=>{
      if(movie.id===id)
        return {...movie, watched:!movie.watched};
      else
        return movie;
    });
    setMovies(updatedList);
    fetch(`http://localhost:8000/movies/${id}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedList.find((movie)=> movie.id===id)),
    })
  };
  
  let formContent;
  let blur
  if(form){
    blur=true;
    formContent=(
      <div className='flex justify-center m-2 absolute top-60 z-10'>
      <div className='m-5 p-2 bg-white border border-gray-700 w-80 flex flex-col justify-center items-center'>
        <input type="text" placeholder='Enter Movie title' value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} className='border border-gray-500 bg-white m-5 p-1'/>
        <button onClick={handleAdd} className='bg-black text-white w-20 m-2'>Submit</button>
        <button onClick={handleHideForm} className='bg-yellow-500 m-3 w-20'>Cancel</button>
        </div>
      </div>
    );
  }
   else{
    blur=false;
   }
  

  /*return(
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
       <button className='bg-red-600 m-5 p-2 hover:bg-red-800 border-2 border-black text-center'>Add Movie</button>
       <input type="checkbox" checked={movie.watched} onChange={handleWatched(movie.id)} className='form-checkbox'/>
              <button onClick={()=> handleWatched(movie.id)} className='bg-green-500'>{movie.watched?'Unmark': 'Mark as Watched'}</button>
  )
}*/


    
    return(
        <div className="bg-[url('./bg2.jpg')] bg-cover bg-center min-h-screen">
        <div className="bg-black border-b-2 border-b-gray-500 flex flex-row shadow-md shadow-gray-500">
          <img src={film} className="h-12 m-2 p-2"></img>
          <p className='absolute right-5 top-5 text-blue-600 underline'>My Account</p>
        </div>
       <h1 className='text-center font-bold p-5 text-3xl md:text-4xl text-white shadow-md m-10'>Movie Watchlist</h1>
       <div className='flex flex-col justify-center items-center'>
        <div className='w-3/4 m-5 text-center flex justify-center items-center'>
        <button onClick={handleShowForm} className={`p-2 bg-yellow-500 hover:bg-yellow-700 border-2 border-black rounded-md m-3 ${blur? 'blur-sm':'blur-none'}`}>Add Movie</button>
         {formContent}
         </div>
        <div className={`w-96 md:w-3/5 bg-gray-300 border border-gray-700 shadow-lg rounded-md opacity-80 text-center p-3 flex flex-col items-center ${blur? 'blur-sm':'blur-none'}`}>
<h2 className='font-bold'>List</h2>
<ul className='flex flex-col items-center'>
{movies.map((movie)=>(
  <li key={movie.id} className=" w-80 h-16 sm:h-14 md:w-4/5 flex flex-row justify-between items-center gap-5 shadow-md bg-white border border-gray-500 m-5 rounded-md p-2 pl-10 pr-10">
    <h2 className={`font-semibold text-md shadow-sm ml-0 w-80 text-left pt-2 ${movie.watched? 'line-through':''}`}>{movie.title}</h2>
    <div className='flex gap-3'>
    <div className='flex gap-1'>
    <button
        onClick={() => handleWatched(movie.id)}
        className={`w-20 sm:w-20 md:w-32 sm:h-10 rounded sm:text-xs sm:p-0 md:text-sm ${
          movie.watched ? 'bg-green-500 text-white hover:bg-green-800 shadow-sm' : 'bg-red-500 text-black hover:bg-red-800 shadow-sm'
        }`}
      >
        {movie.watched ? 'Unmark' : 'Mark as watched'}
      </button>
    <input type="checkbox" checked={movie.watched} onChange={()=>handleWatched(movie.id)} className='w-5'/>
    </div>
    <button onClick={()=>deleteMovie(movie)} className='bg-black text-white p-2 hover:opacity-70 rounded sm:text-xs shadow-sm'>Delete</button>
    </div>
  </li>
))}
</ul>
</div>
        </div>
        </div>
        
    );

  }
export default App;