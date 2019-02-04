import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

export class Task_Edit_Name extends React.Component {    

	constructor(props) {
	    super(props);
	    this.state = {value: ''};
	    this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
	    this.setState({value: event.target.value});
	}

	handleSubmit(event,task) {
	    this.props.taskChangeName(this.state.value,task.name)
	    event.preventDefault();
	}

	render(){
		let task = this.props.task
		console.log('task', task)
		return(
			<div 		                            
		        onDragStart={(e)=>this.props.onDragStart(e, task)}                   
		        draggable                    
		        className="draggable">
		        <form onSubmit={(e)=>this.handleSubmit(e,task)}>                       
		        <input type='text'value={this.state.value} onChange={this.handleChange}/>
		        </form>
		        <p>{task.description}</p>
		    </div>
		)
	}
}