var BugList = React.createClass({
	render: function() {
		return (
			<table>
				<thead>
					<th>ID</th>
					<th>Priority</th>
					<th>Owner</th>
					<th>Title</th>
				</thead>
				<tbody>
					<td>1</td>
					<td>Open</td>
					<td>P1</td>
					<td>Ravan</td>
					<td>App crashes on open</td>
				</tbody>
			</table>
		);
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);
