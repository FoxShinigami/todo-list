import React from 'react';
import axios from 'axios';
import { Task } from './task'
import { Task_Edit_Name } from './task_edit_name'
import { Task_Edit_Description } from './task_edit_description'
import '../App.css';

export class Section extends React.Component {    

	constructor(props) {
			super(props);
			this.taskChangeName = this.taskChangeName.bind(this)
      this.taskChangeNameStart = this.taskChangeNameStart.bind(this)  
      this.taskChangeDescription = this.taskChangeDescription.bind(this)
      this.taskChangeDescriptionStart = this.taskChangeDescriptionStart.bind(this)  
      this.onDragStart = this.onDragStart.bind(this)
      this.state={
        tasks: this.props.section.job
      }
	}

	taskChangeName(new_name,name){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].name === name){
        tasks[task].name = new_name
        tasks[task].edit_name = false
        axios.patch('http://177.21.29.139:8000/list/api/job/'+tasks[task].id+'/',{name:new_name}).then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
      }
    }    
    this.setState({tasks: tasks},function () {
    });     
  }

  taskChangeNameStart(name){   
    let tasks = this.props.section.job
    for (let task in tasks){
      if(!tasks[task].edit_description){
        if(tasks[task].name === name){
          tasks[task].edit_name= true
        }
      }  
    }
    this.setState({tasks: tasks}); 
  }

  taskChangeDescription(new_description,description){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].description === description){
        tasks[task].description = new_description
        tasks[task].edit_description = false
        axios.patch('http://177.21.29.139:8000/list/api/job/'+tasks[task].id+'/',{description:new_description}).then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
      }
    }    
    this.setState({tasks: tasks},function () {
    });     
  }

  taskChangeDescriptionStart(description){   
    let tasks = this.props.section.job
    for (let task in tasks){
      if(!tasks[task].edit_name){
        if(tasks[task].description === description){
          tasks[task].edit_description = true
        }
      }
    }
    this.setState({tasks: tasks});     
	}

  onDragStart(ev, task){
    ev.dataTransfer.setData("id",task.id)
  } 

	render(){
		let section = this.props.section
    let section_list = []
		section.job.forEach((t) => {    
      if(t.edit_name){
        section_list.push(
          <div key={t.name} >
              <Task_Edit_Name task={t} onDragStart={this.onDragStart} taskChangeName={this.taskChangeName} />
          </div>
        );
      }else if(t.edit_description){
        section_list.push(
          <div key={t.name} >
              <Task_Edit_Description task={t} onDragStart={this.onDragStart} taskChangeDescription={this.taskChangeDescription} />
          </div>
        );
      }else{
        section_list.push(
          <div key={t.name} >
              <Task task={t} onDragStart={this.onDragStart} taskChangeNameStart={this.taskChangeNameStart} taskChangeDescriptionStart={this.taskChangeDescriptionStart}/>
          </div>
        ); 
      }             
            
		});
		
		return(
			<div
        className="section"
        onDragOver={(e)=>this.props.onDragOver(e)}                    
        onDrop={(e)=>{this.props.onDrop(e, section.id)}}>                    
        <span className="task-header">{section.name}</span>         
        <div>                    
        {section_list}
        </div>                
      </div> 
		)
	}
}