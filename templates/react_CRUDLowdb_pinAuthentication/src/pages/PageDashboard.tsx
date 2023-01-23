import { useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import '../styles/pageDashboard.scss';

export const PageDashboard = () => {
	const { todos, prePageLoad } = useContext(AppContext);

	useEffect(() => {
		prePageLoad();
	},[]);

	return (
		<div className="page pageDashboard">
			<h2>Todos</h2>
			<div className="todos">
				{todos.map((todo, i) => {
					return (
						<ul className="todo" key={i}>
							<li>{todo.todoText}: <a target="_blank" href={todo.url}>{todo.title} at {todo.company}</a></li>
						</ul>
					);
				})}
			</div>
		</div>
	);
};
