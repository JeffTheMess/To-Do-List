import './App.css';
import React, { useEffect, useState } from 'react';
import Modal from './components/Modal';
import axios from 'axios';

function App() {
  const [viewCompleted, setViewComplete] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title:"",
    description: "",
    completed: false
  });
  const [todoList, setTodoList] = useState([]);


  function refreshList(){
    axios.get("http://localhost:8000/api/tasks/").then(res => setTodoList(res.data)).catch(err => console.log(err));
  }
  useEffect(() => {
    refreshList()}, [])

  function toggle(){
    setModal(false)
  };


  function handleSubmit(item){
    toggle();
    if(item.id){
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item).then(res => refreshList()).catch(err => console.log(err));
      return;
    }
    axios.post("http://localhost:8000/api/tasks/", item).then(res => refreshList()).catch(err => console.log(err));
  }

  function handleDelete(item){
      axios.delete(`http://localhost:8000/api/tasks/${item.id}/`, item).then(res => refreshList());
  }

  function createItem(){
    const item = {title: "", description: "", completed: false};
    setActiveItem(item);
    setModal(!modal);
  }

  function editItem(item){
    setActiveItem(item);
    setModal(!modal);
  }


  function displayCompleted(status){
    if (status) {
      setViewComplete(true);
    }
    else{
      setViewComplete(false);
    }
  }

  function renderTabList(){
    return(
      <div className='my-5 tab-list'>
        <span onClick={() => displayCompleted(true)} className={viewCompleted ? "active": ""}>
          Completed
        </span>
        <span onClick={() => displayCompleted(false)} className={viewCompleted ? "": "active"}>
          Incomplete
        </span>
      </div>
    )
  }

  function renderItems(){
    
    const newItems = todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} title={item.title}>
          {item.title}
        </span>
        <span>
          <button onClick={() => editItem(item)} className='btn btn-info mr-2'>Edit</button>
          <button onClick={() => handleDelete(item)} className='btn btn-danger mr-2'>Delete</button>
        </span>
      </li>
    ));
  }


  return (
    <main className="content p-3 mb=2 bg-info">
      <h1 className="text-white text-uppercase text-center my-4"> Task Manager</h1>
      <div className="row">
        <div className='col-md-6 col-sma-10 mx-auto p-0'>
          <div className='card p-3'>
            <div>
              <button onClick={createItem} className='btn btn-primary'>Add Task</button>
            </div>
            {renderTabList()}
            <ul className='list-group list-group-flush'>
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      <footer className='my-3 mmb-5 bg-info text-white text-center'>Copyright 2023 &copy; All Rights Reserved</footer>
      {modal ? (
        <Modal activeItem={activeItem} toggle={toggle} onSave={handleSubmit}></Modal>
      ): null}
    </main>
  );
}

export default App;
