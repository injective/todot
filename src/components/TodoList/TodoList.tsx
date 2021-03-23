import React, {ReactElement} from 'react';
import {Task} from '../../types/interfaces';

interface Props {
    tasks: Task[];
    editTask: (item: Task) => void;
    removeTask: (itemId: string) => void;
}

export const TodoList:React.FC<Props> = ({tasks, editTask, removeTask}: Props) => {
    return (
        <>
            {
                tasks.map(item => (
                    <li key={item.id} className="list-group-item">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <button onClick={() => editTask(item)} className="btn btn-info">edit</button>
                        <button onClick={() => removeTask(item.id)} className="btn btn-danger">remove</button>
                    </li>
                ))
            }
        </>
    )
};
