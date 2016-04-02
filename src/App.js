var BugFilter = React.createClass({
	render: function() {
		return (
			<div className="bugFilter">
				<span>This is where the filter will be</span>
			</div>
		);
	}
});

var BugTable = React.createClass({
	render: function() {
		var bugRows = this.props.bugs.map(function(bug) {
			return <BugRow key={bug.id} bug={bug} ></BugRow>
		});

		return (
			<table border="1">
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Priority</th>
						<th>Owner</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{bugRows}
				</tbody>
			</table>
		);
	}
});

var BugRow = React.createClass({
	render: function() {
		return (
			<tr className="bugRow">
				<td>{ this.props.bug.id }</td>
				<td>{ this.props.bug.status }</td>
				<td>{ this.props.bug.priority }</td>
				<td>{ this.props.bug.owner }</td>
				<td>{ this.props.bug.title }</td>
			</tr>
		);
	}
});

var BugAdd = React.createClass({
	handleFormSubmit: function(e) {
		e.preventDefault();

		this.props.addBug({
			owner: e.target.owner.value,
			title: e.target.owner.title,
			status: 'New',
			priority: 'P1'
		});
	},
	render: function() {
		return (
			<div className="bugAdd">
				<form onSubmit={this.handleFormSubmit}>
					<input type="text" name="owner" placeholder="Owner" />
					<input type="text" name="title" placeholder="Title" />
					<input type="submit" value="Add Bug" />
				</form>
			</div>
		);
	}
});

var BugList = React.createClass({
	addBug: function(bug) {
		var newState = this.state.bugs;
		newState.push({
			id: this.state.bugs.length + 1,
			status: bug.status,
			priority: bug.priority,
			owner: bug.owner,
			title: bug.title
		});
		this.setState(newState);
	},
	getInitialState: function() {
		return {bugs: [
			{
				id: 1,
				status: 'Open',
				priority: 'P1',
				owner: 'Joey',
				title: 'Joey Tribbiani does not share food.'
			},
			{
				id: 2,
				status: 'Closed',
				priority: 'P3',
				owner: 'Chandler',
				title: 'Ms. Chanandler Bong.'
			}
		]}
	},
	render: function() {
		return (
			<div className="bugList">
				<BugFilter />
				<BugAdd addBug={this.addBug} />
				<BugTable bugs={this.state.bugs} />
			</div>
		);
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);
