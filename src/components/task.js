import React from 'react';
import { FaTimes } from "react-icons/fa";
import axios from 'axios';
import '../App.css';

export class Task extends React.Component {    

	constructor(props) {
	    super(props);
		this.onClickName = this.onClickName.bind(this)
		this.onClickDescription = this.onClickDescription.bind(this)
	}

	onClickName(e,task){
		e.preventDefault();
		this.props.taskChangeNameStart(task.name)
	}
	onClickDescription(e,task){
		e.preventDefault();
		this.props.taskChangeDescriptionStart(task.description)
	}

	deleteJob(id){
		axios.delete('http://177.21.29.139:8000/list/api/job/'+id+'/').then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
	}

	render(){
		let task = this.props.task
		return(
			<div 		                            
		        onDragStart={(e)=>this.props.onDragStart(e, task)}                    
		        draggable                    
		        className="draggable">     
				<FaTimes style={{float: 'inline-end', margin:"0.1em"}} onClick={()=>this.deleteJob(task.id)}></FaTimes>                  
		        <p onClick={(e)=>this.onClickName(e, task)}>{task.name}</p>
		        <p onClick={(e)=>this.onClickDescription(e, task)}>{task.description}</p>                
		    </div>
		)
	}
}