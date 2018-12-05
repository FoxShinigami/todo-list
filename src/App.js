import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {    
  
  constructor(props) {
      super(props);
      this.state = {        
        tasks: [
          {
            name:"Task 1",
              category:"to_do"
            },  
          
            {
              name:"Task 2", 
              category:"to_do"
          },  
          
            {
              name:"Task 3", 
              category:"done"
            }          
        ],
        sections: {}        
    }     
  }

  componentWillMount(){
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
    sections[t.category].list.push(<div 
      key={t.name}                     
      onDragStart={(e)=>this.onDragStart(e, t)}                    
      draggable                    
      className="draggable">                       
         <p>{t.name}</p>
         <p>task description</p>                
    </div>);       
    });
    this.setState({sections: sections}, function () {
        console.log("this.state", this.state.sections)
    });
    
  }


    onDragOver(ev){
      ev.preventDefault();
    }

    onDragStart(ev, task){
      console.log('dragstart')
      ev.dataTransfer.setData("name",task.name)
    }

    onDrop(ev, cat){    
      console.log("dropstart",cat)
      let name = ev.dataTransfer.getData("name");

      let sections = this.state.sections
      for(let section in sections){
        let i = 0
        for(let task of sections[section].list){
          if(task){
            if(task.key == name){
              console.log(task)
              sections[cat].list.push(task)
              delete sections[section].list[i]
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
    let sections = this.state.sections     
    let sections_list = []
    for (let section in sections) {
        sections_list.push(
        <div key={sections[section].id} className="section" 
          onDragOver={(e)=>this.onDragOver(e)}                    
          onDrop={(e)=>{this.onDrop(e, section)}}>                    
          <span className="task-header">{sections[section].name}</span>         
          <div>                    
          {sections[section].list}
          </div>                
        </div> 
      ); 
    }
      return (
        <div className="container-drag">
        <h2 className="header">To do List</h2>  
        <div>       
          {sections_list}
        </div>          
      </div>);
    }
}

export default App;