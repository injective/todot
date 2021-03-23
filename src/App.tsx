import React, {useEffect, useState} from 'react';
import './App.scss';
import {TodoList} from './components/TodoList/TodoList';
import {Task} from './types/interfaces';


const arrayTasks: Array<Task>  = [
    { id: '1', title: 'learn JS', description: 'learn variables, arrays, objects, es6, etc' },
    { id: '2', title: 'learn CSS', description: 'learn CSS3, SCSS, LESS' },
    { id: '3', title: 'learn React JS', description: 'learn classes, hooks, routes' },
    { id: '4', title: 'learn Redux', description: 'learn Redux' },
    { id: '5', title: 'learn NODE JS', description: 'learn NODE JS' }
];


function App() {
    const [tasksArray, setTasksArray] = useState(arrayTasks);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [taskItem, setTaskItem] = useState({id: '', title: '', description: ''});

    useEffect(() => {
        console.log(taskTitle);
        console.log(taskDescription);
    }, [taskTitle, taskDescription]);

    const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const handleChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskDescription(e.currentTarget.value);
    };


    const randomID = ():string => {
        return `${Math.random()}-${taskTitle}`;
    };

    const addTodoItem = () => {
        const rnd: string = randomID();
        if (taskTitle === '') {
            alert('шо нах!');
        } else {
            setTasksArray([...tasksArray, { id: rnd, title: taskTitle, description: taskDescription }]);
            setTaskTitle('');
            setTaskDescription('');
        }
    };

    const removeTask = (itemId: string) => {
        setTasksArray(tasksArray.filter(({ id }) => id !== itemId));
    };

    const editTask = (item: any) => {
        setIsEdit(true);
        setTaskTitle(item.title);
        setTaskDescription(item.description);
        setTaskItem(item);
    };
    const submitEdit = () => {

        const editedArray: any = tasksArray.map((task) => {
            console.log(task.id);
            if(task.id === taskItem.id) {
                task.title = taskTitle;
                task.description = taskDescription;
                return task;
            }
            return task;
        });
        setTasksArray(editedArray);
        setIsEdit(false);
        setTaskTitle('');
        setTaskDescription('');
    };

    return (
        <div className="App">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-xl-6">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                            <input onChange={handleChangeTitle} value={taskTitle} type="email" className="form-control" id="exampleInputEmail1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                            <input onChange={handleChangeDescription} value={taskDescription} className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <button onClick={() => {isEdit ? submitEdit() : addTodoItem()} } className="btn btn-primary">{isEdit ? 'Edit' : 'Submit'}</button>
                    </div>
                </div>

                <hr/>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-xl-6">
                        <ul className="list-group">
                            <TodoList
                                tasks={tasksArray}
                                editTask={editTask}
                                removeTask={removeTask}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
