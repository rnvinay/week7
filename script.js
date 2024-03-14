document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const courseId = document.getElementById('courseId').value;
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;
        const additionalDetails = document.getElementById('additionalDetails').value;

        const taskData = {
            courseId,
            taskName,
            dueDate,
            additionalDetails
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            alert('Task added successfully!');
            // Clear form fields after successful submission
            taskForm.reset();
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to add task');
        }
    });
});

