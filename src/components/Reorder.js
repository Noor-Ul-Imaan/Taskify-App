import React, { useEffect } from 'react';
import './Reorder.css';

function Reorder() {
  useEffect(() => {
    const rolesContainer = document.getElementById('rolesContainer');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (roles) {
      roles.forEach((role, index) => {
        const roleDiv = createRoleDiv(role.name, index);
        rolesContainer.appendChild(roleDiv);
      });
    }

    rolesContainer.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', event.target.dataset.index);
    });

    rolesContainer.addEventListener('dragover', function (event) {
      event.preventDefault();
    });

    rolesContainer.addEventListener('drop', function (event) {
      event.preventDefault();
      const startIndex = event.dataTransfer.getData('text/plain');
      const endIndex = event.target.dataset.index;
      const draggedElement = document.querySelector(`.role[data-index="${startIndex}"]`);
      const droppedElement = event.target.closest('.role');

      if (startIndex !== endIndex) {
        let targetIndex = endIndex;
        if (event.offsetY > draggedElement.offsetHeight / 2) {
          targetIndex++;
        }
        if (droppedElement) {
          const targetElement = document.querySelector(`.role[data-index="${targetIndex}"]`);
          if (targetElement) {
            rolesContainer.insertBefore(draggedElement, targetElement);
          } else {
            rolesContainer.appendChild(draggedElement);
          }
        } else {
          rolesContainer.appendChild(draggedElement);
        }
        rearrangeRoles();
      }
    });

    function createRoleDiv(name, index) {
      const roleDiv = document.createElement('div');
      roleDiv.classList.add('role');
      roleDiv.textContent = name;
      roleDiv.draggable = true;
      roleDiv.dataset.index = index;
      return roleDiv;
    }

    function rearrangeRoles() {
      const newRoles = [];
      const roleElements = document.querySelectorAll('.role');
      roleElements.forEach((roleElement, index) => {
        const roleIndex = roleElement.dataset.index;
        newRoles.push({ name: roles[roleIndex].name });
        roles[roleIndex].index = index;
      });
      localStorage.setItem('roles', JSON.stringify(newRoles));
    }
  }, []);

  return (
    <div className="container">
      <h1>Reorder Hierarchy</h1>
      <div id="rolesContainer" className="roles-container">
        {/* Roles will be dynamically added here */}
      </div>
      <div className="save-button" id="save-button">
        <button id="Save">Save</button>
      </div>
    </div>
  );
}

export default Reorder;