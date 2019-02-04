import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Task } from './components/task'
import { Task_Edit_Name } from './components/task_edit_name'
import { Section } from './components/section'

class App extends React.Component {    
  
  constructor(props) {
      super(props);
      this.state = {        
        tasks: [
          {
            name:"Task 1",
            category:"to_do",
            description:"task description 1",
            edit:true
          },           
          {
            name:"Task 2", 
            category:"to_do",
            description:"task description 2",
            edit:false
          },    
          {
            name:"Task 3", 
            category:"done",
            description:"task description 3",
            edit:false

          }          
        ],
        sections: {}        
    }     
    this.onDragStart = this.onDragStart.bind(this)
    this.taskChangeName = this.taskChangeName.bind(this)
    this.taskChangeNameStart = this.taskChangeNameStart.bind(this)
  }

    taskChangeName(new_name,name){
      let tasks = this.state.tasks
      for (let task in tasks){
        if(tasks[task].name == name){
          tasks[task].name = new_name
          tasks[task].edit = false
        }
      }
      
      this.setState({tasks: tasks},function () {
        console.log("this.state", this.state.sections)
      }); 
    }

    taskChangeNameStart(name){
      console.log("entrou aqui",name)
      let tasks = this.state.tasks
      for (let task in tasks){
        if(tasks[task].name == name){
          tasks[task].edit = true
        }
      }
      
      this.setState({tasks: tasks},function () {
        console.log("this.state", this.state.sections)
      }); 
    }

    onDragOver(ev){
      ev.preventDefault();
    }

    onDragStart(ev, task){
      ev.dataTransfer.setData("name",task.name)
    }

    onDrop(ev, cat){    
      let name = ev.dataTransfer.getData("name");
      let sections = this.state.sections
      for(let section in sections){
        let i = 0
        for(let task of sections[section].list){
            console.log('task', task)
          if(task){
            if(task.key == name){
              sections[cat].list.push(task)
              var index = sections[section].list.indexOf(sections[section].list[i]);
              if (index > -1) {
                sections[section].list.splice(index, 1);
              }
            }
          }
          i++
        }         
      }
      this.setState({sections: sections})   
      ev.preventDefault();
      ev.stopPropagation();     
    }

    onDropOut(ev){
      let name = ev.dataTransfer.getData("name");
      let sections = this.state.sections
      for(let section in sections){
        let i = 0
        for(let task of sections[section].list){
          if(task){
            if(task.key == name){
              let number = Object.keys(sections).length+1
              sections[`new${number}`]={
                id:sections.Count+1,
                name:`New${number}`,
                list:[]
              }
              sections[`new${number}`].list.push(task)


              var index = sections[section].list.indexOf(sections[section].list[i]);
              if (index > -1) {
                sections[section].list.splice(index, 1);
              }
            }
          }
          i++
        }
      }
      this.setState({sections: sections})   
      ev.preventDefault();
      ev.stopPropagation(); 
    }

    render () {

      var sections = {
        'to_do':{
          id:1,
          name:"To Do",
          list:[]
        },
        'done':{
          id:2,
          name:"Done",
          list:[]
        },
      }  

      this.state.tasks.forEach((t) => {  
        if(t.edit){
          sections[t.category].list.push(
            <div key={t.name} >
                <Task_Edit_Name task={t} onDragStart={this.onDragStart} taskChangeName={this.taskChangeName} />
            </div>
          );
        }else{
          sections[t.category].list.push(
            <div key={t.name} >
                <Task task={t} onDragStart={this.onDragStart} taskChangeNameStart={this.taskChangeNameStart} />
            </div>
          ); 
        }             
              
      });
 
    let sections_list = []
    for (let section in sections) {
        sections_list.push(
          <div key={sections[section].id} className="section-out">
            <Section section={sections[section]}/>
          </div>
      ); 
    }
      return (
        <div className="container-drag">
        <h2 className="header">To do List</h2>  
        <div style={{width:"100%",height:"100%"}}
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>{this.onDropOut(e)}}>       
          {sections_list}
        </div>          
      </div>);
    }
}

export default App;