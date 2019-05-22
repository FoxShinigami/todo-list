import React from 'react';
import '../App.css';

export class Task extends React.Component {    

	constructor(props) {
	    super(props);
	    this.onClick = this.onClick.bind(this)
	}

	onClick(e,task){
		console.log(task)
		this.props.taskChangeNameStart(task.name)
	}

	render(){
		let task = this.props.task
		return(
			<div 		                            
		        onDragStart={(e)=>this.props.onDragStart(e, task)}                    
		        draggable                    
		        className="draggable">                       
		        <p onClick={(e)=>this.onClick(e, task)}>{task.name}</p>
		        <p>{task.description}</p>                
		    </div>
		)
	}
}