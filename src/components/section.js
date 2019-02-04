import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

export class Section extends React.Component {    

	constructor(props) {
	    super(props);
	}

	render(){
		let section = this.props.section
		return(
			<div
				className="section"
        onDragOver={(e)=>this.onDragOver(e)}                    
        onDrop={(e)=>{this.onDrop(e, section)}}>                    
        <span className="task-header">{section.name}</span>         
        <div>                    
        {section.list}
        </div>                
      </div> 
		)
	}
}