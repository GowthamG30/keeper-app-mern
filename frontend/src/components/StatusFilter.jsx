import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const StatusFilter = ({ statusFilter, onSelect }) => {
	return (
		<DropdownButton
			id="dropdown-basic-button"
			title={statusFilter}
			onSelect={(eventKey) => onSelect(eventKey)}
		>
			<Dropdown.Item eventKey="All">All</Dropdown.Item>
			<Dropdown.Item eventKey="To Do">To Do</Dropdown.Item>
			<Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
			<Dropdown.Item eventKey="Done">Done</Dropdown.Item>
		</DropdownButton>
	);
};

export default StatusFilter;
