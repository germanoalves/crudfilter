import fireDb from "../firebase";
import React,{useState,useEffect} from 'react';

export function Soma() {
  const [blogs,setBlogs]=useState([])
  const fetchBlogs=async()=>{
    const response=fireDb.collection('contacts');
    const data=await response.get();
    data.docs.forEach(item=>{
     setBlogs([...blogs,item.data()])
    })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  return (
    <div className="App">
      {
        blogs && blogs.map(blog=>{
          return(
            <div className="blog-container">
              <h4>{blog.name}</h4>
              <p>{blog.body}</p>
            </div>
          )
        })
      }
    </div>
  );
}

