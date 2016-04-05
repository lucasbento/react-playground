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
			title: e.target.title.value,
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
		var bugs = this.state.bugs;

		$.ajax({
			url: '/api/bugs',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({bug: bug}),
			success: function(response) {
				bugs.push(response);

				this.setState({
					bugs: bugs
				});
			}.bind(this)
		});
	},
	componentDidMount: function() {
		this.requestBugs = $.get('/api/bugs', function(response) {
			this.setState({
				bugs: response
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.requestBugs.abort();
	},
	getInitialState: function() {
		return {
			bugs: []
		};
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
