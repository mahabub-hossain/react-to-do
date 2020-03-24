import axios from "axios";
import React,{ Component } from 'react';
import logo from './logo.svg';
import loaderreact from './loaderreact.gif';
import './App.css';

import Listitem from './Listitem';

class App extends Component {
  constructor(){
    //super is used for constructor
    super()
    //setting data in state in json formate
    this.state = {
      //initializing newTodo empty
      newTodo:"",
      editing:false,
      editingindex:null,
      notification:null,
      loaderreact:true,
      todos:[]
    };
    this.apiUrl ="https://5e7a160817314d0016133cb4.mockapi.io/"
    //every method has to bind 
    this.handleChange = this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
  }
  //api call to get all todos
  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);
    setTimeout(() => {
      this.setState({
      //storing input value in newTodo
      todos:response.data,
      loaderreact:false
    })
    },1000);
    
    //console.log(response)
  }
  //onchange event when write any thing in input box
  handleChange(event){
    //set state is define function on react Component class
    this.setState({
      //storing input value in newTodo
      newTodo:event.target.value
    })
  }
  // generateId(){
  //   const lastitem = this.state.todos[this.state.todos.length -1]
  //   if(lastitem){
  //     return lastitem.id + 1
  //   }
  //   return 1
  // }
  async addTodo(){
    //creating an object of newTodo
    // const newTodo = {
    //       name:this.state.newTodo,
    //       //creating unique id with todos lengt
    //       id:this.generateId()
    //     };
        //keeping old todos in a todos (cloning)
    const response = await axios.post(`${this.apiUrl}/todos`,{
      name:this.state.newTodo
    });
    const todos = this.state.todos
    //pushing newTodo in cloned todos
    todos.push(response.data)
    //in state setting todos = todos
    this.setState({ 
        todos:todos,
        //newTodo is empty after form submit
        newTodo:''

    })
    this.alert('Todo added successfully!!')
  }
  async deleteTodo(index){
    //console.log(index)
     //keeping old todos in a todos (cloning)
    const todos = this.state.todos
    const todo = todos[index]
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`)
    delete todos[index]
    this.setState({ 
        todos:todos,
    })
    this.alert('Todo deleted successfully!!')
  }
  editTodo(index){
    //getting todo by index
    const todo = this.state.todos[index]
    this.setState({
      editing:true,
      editingindex:index,
      newTodo:todo.name
    })
  }
  async updateTodo(){
    //getting te todos with index
    const todo = this.state.todos[this.state.editingindex]
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      name:this.state.newTodo
    });
    //console.log(response)
    //updating this todos name with new todo name
    todo.name = this.state.newTodo
    //then getting all todos
    const todos = this.state.todos
    //replace todos list index with new todo
    todos[this.state.editingindex] = response.data
    //in setState keeping new todos,editing false and so on
    this.setState({
      todos,
      editing:false,
      editingindex:null,
      newTodo:''
    })
    this.alert('Todo Updated successfully!!')
  }
  alert(notification){
    this.setState({
      notification
    })
    setTimeout(() => {
      this.setState({
      notification:null
    })
    }, 2000);
  }
  render() {
    //console.log(this.state.newTodo)
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="app-title">Todos CRUD</h2>

        </header>
        <div className="container">
          {this.state.notification &&
          <div className="alert mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
          </div>
          }
          
          <input
              type= "text"
            className="my-4 form-control"
            placeholder="Add New Todo"
            name="todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
          <button 
            className="btn btn-success btn-block mb-4"
            onClick ={this.state.editing ? this.updateTodo : this.addTodo}
            disabled= {this.state.newTodo.length < 5}
          >
          {this.state.editing ? 'Update Todo' : 'Add Todo'}
          </button>
          {this.state.loaderreact &&
          
            <img src={loaderreact} alt="ing" />
          }
          {(!this.state.editing || this.state.loadingreact) &&
          <ul className="list-group">
            {
                this.state.todos.map((item,index)=>{
                  return <Listitem
                    key={item.id}
                    item={item}
                    editTodo={()=>{this.editTodo(index)}}
                    deleteTodo ={()=>{this.deleteTodo(index)}}
                  />
                })}
          </ul>
          }
          
        </div>
      </div>
    );
  }
}

export default App;
