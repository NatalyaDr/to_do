import React from 'react';
import './App.css'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Alltodos: [],
      todosOnlyTabType: [],
      todoItem: '',
      activeTab: 'All'
    }
  }

  componentDidMount() {
    this.getTodos()
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let Alltodos = this.state.Alltodos
      Alltodos.push({
        id: Math.random(),
        text: this.state.todoItem,
        selected: false,
        type: 'active'
      })
      this.setState({ Alltodos, todoItem: '' })
      this.saveTodos(Alltodos)
    }
  };

  selectOrUnselect = (index) => {
    let Alltodos = this.state.Alltodos
    Alltodos[index].selected = !Alltodos[index].selected
    Alltodos[index].type = Alltodos[index].selected ? 'completed' : 'active'
    this.setState({ Alltodos })
    this.saveTodos(Alltodos)
  }

  deleteteItem = (id) => {
    let Alltodos = this.state.Alltodos.filter(item => item.id !== id)
    this.setState({ Alltodos })
    this.saveTodos(Alltodos)
  }


  setTab = tabName => {
    let  Alltodos = this.state.Alltodos
    let todosOnlyTabType = this.state.todosOnlyTabType
    todosOnlyTabType = Alltodos.filter(el => el.type === tabName)
    this.setState({ todosOnlyTabType, activeTab: tabName })
  }

  changeText = (text, index) => {
    let Alltodos = this.state.Alltodos
    Alltodos[index].text = text
    this.setState({ Alltodos })
    this.saveTodos(Alltodos)
  }

  saveTodos = todos => localStorage.setItem('todos', JSON.stringify(todos))
  

  getTodos = () => {
    this.setState({ Alltodos: JSON.parse(localStorage.getItem('todos') || '[]') })
  }


  render() {
    return (
      <div className="main" onKeyPress={this.handleKeyPress} tabIndex="1">
        <div className="todo">
          <div className="title">todos</div>
          <div className="todo-form">
            <input type="text"
              placeholder="What needs to be done?"
              value={this.state.todoItem}
              onChange={(event) => this.setState({ todoItem: event.target.value })} />
            <div className="items">
              {this.state[this.state.activeTab === 'All' ? 'Alltodos' : 'todosOnlyTabType'].map((el, index) =>
                <div className="todo-item" key={index}>
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={el.selected}
                    onChange={() => this.selectOrUnselect(index)} />
                  <input
                    type="text"
                    className={`todo-text ${el.type}`}
                    onChange={( event ) => this.changeText(event.target.value, index)}
                    value={el.text} />
                  <div
                    className="todo-delete"
                    onClick={() => this.deleteteItem(el.id)}>X</div>
                </div>
              )}
            </div>
            <div className="tabs">
              <div className="tab" onClick={() => this.setState({ activeTab: 'All' })}>All</div>
              <div className="tab" onClick={() => this.setTab('active')}>Active</div>
              <div className="tab" onClick={() => this.setTab('completed')}>Completed</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default TodoApp;
