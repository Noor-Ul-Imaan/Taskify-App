import React, { useState } from 'react';
import './OrgHierarchy.css';

function OrganizationHierarchy() {
  const [roles, setRoles] = useState([{ roleName: '', description: '', create: false, assign: false, delete: false, viewPerformance: false }]);

  const handleAddRole = () => {
    setRoles([...roles, { roleName: '', description: '', create: false, assign: false, delete: false, viewPerformance: false }]);
  };

  const handleSubmit = () => {
    const rolesData = roles.map(role => ({
      name: role.roleName,
      description: role.description,
      permissions: {
        create: role.create,
        assign: role.assign,
        delete: role.delete,
        viewPerformance: role.viewPerformance
      }
    }));

    localStorage.setItem('roles', JSON.stringify(rolesData));
    window.location.href = 'reorder.html';
  };

  return (
    <div className="container">
      <h1>Organization Hierarchy</h1>
      <div id="rolesContainer">
        {roles.map((role, index) => (
          <div className="role" key={index}>
            <div>
              <label htmlFor={`roleName-${index}`}><b>Role Name:</b></label>
              <input
                type="text"
                id={`roleName-${index}`}
                name={`roleName-${index}`}
                value={role.roleName}
                placeholder="Enter role name"
                onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], roleName: e.target.value }, ...roles.slice(index + 1)])}
                required
              />
            </div>
            <div>
              <label htmlFor={`description-${index}`}><b>Description:</b></label>
              <textarea
                id={`description-${index}`}
                name={`description-${index}`}
                value={role.description}
                placeholder="Enter description"
                onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], description: e.target.value }, ...roles.slice(index + 1)])}
              />
            </div>
            <div>
              <label><b>Permissions:</b></label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={`create-${index}`}
                    checked={role.create}
                    onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], create: e.target.checked }, ...roles.slice(index + 1)])}
                  /> Create Tasks
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={`assign-${index}`}
                    checked={role.assign}
                    onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], assign: e.target.checked }, ...roles.slice(index + 1)])}
                  /> Assign Tasks
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={`delete-${index}`}
                    checked={role.delete}
                    onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], delete: e.target.checked }, ...roles.slice(index + 1)])}
                  /> Delete Tasks
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={`viewPerformance-${index}`}
                    checked={role.viewPerformance}
                    onChange={(e) => setRoles([...roles.slice(0, index), { ...roles[index], viewPerformance: e.target.checked }, ...roles.slice(index + 1)])}
                  /> View team members' performance
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddRole}>Add Role</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default OrganizationHierarchy;
