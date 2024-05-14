document.addEventListener('DOMContentLoaded', () => {
    function updateStatus(task, checkbox) {
        const statusCell = checkbox.closest('.task-item').querySelector('.task-item__status');
        if (checkbox.checked) {
            statusCell.textContent = 'Completed';
        } else {
            statusCell.textContent = 'In Progress';
        }
    }

    const taskTitle = document.getElementById('task-title');
    const taskPriority = document.getElementById('task-priority');
    const taskDate = document.getElementById('task-date');
    const addTaskButton = document.getElementById('add-task');
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

    // Load tasks from localStorage on page load
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const title = taskTitle.value.trim();
        const priority = taskPriority.value;
        const date = taskDate.value;

        if (validateInputs(title, priority, date)) {
            const task = { title, priority, date, completed: false };
            addTask(task);
            saveTask(task);
            clearInputs();
        }
    });

    function validateInputs(title, priority, date) {
        if (title === '') {
            alert('Please enter a task title.');
            return false;
        }
        if (priority === '') {
            alert('Please select a task priority.');
            return false;
        }
        if (date === '') {
            alert('Please select a task date.');
            return false;
        }
        return true;
    }

    function addTask(task) {
        const row = taskTable.insertRow();
        row.className = 'task-item';
        if (task.completed) {
            row.classList.add('completed');
        }

        const cellIcon = row.insertCell(0);
        const icon = document.createElement('span');
        icon.className = 'task-item__icon';
        icon.innerHTML = '<i class="fas fa-tasks"></i>';
        cellIcon.appendChild(icon);

        const cellSubject = row.insertCell(1);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-item__checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('click', () => {
            row.classList.toggle('completed');
            updateStatus(task, checkbox);
        });
        cellSubject.appendChild(checkbox);
        const subject = document.createElement('span');
        subject.className = 'task-item__subject';
        subject.textContent = task.title;
        if (task.completed) {
            subject.style.textDecoration = 'line-through';
        }
        cellSubject.appendChild(subject);

        const cellPriority = row.insertCell(2);
        cellPriority.className = 'task-item__priority';
        
        const priorityText = document.createElement('span');
        priorityText.className = 'priority-text';
        priorityText.textContent = task.priority;
        cellPriority.appendChild(priorityText);
        
        cellPriority.classList.add(`priority-${task.priority.toLowerCase()}`);
        

        const cellDate = row.insertCell(3);
        cellDate.textContent = task.date;

        const cellStatus = row.insertCell(4);
        cellStatus.className = 'task-item__status';
        cellStatus.textContent = task.completed ? 'Completed' : 'In Progress';

        const cellRemove = row.insertCell(5);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'task-item__button';
        removeButton.addEventListener('click', () => {
            row.remove();
            removeTask(task);
        });
        cellRemove.appendChild(removeButton);
    }

    function clearInputs() {
        taskTitle.value = '';
        taskPriority.value = '';
        taskDate.value = '';
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => addTask(task));
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function removeTask(taskToRemove) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.title !== taskToRemove.title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

icon.innerHTML = '<i class="fas fa-tasks"></i>';
