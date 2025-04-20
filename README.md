# ProjectTrack

A comprehensive project management system with task assignment and tracking capabilities.

## Task Management Feature

The task management system allows users to:

1. **Create and assign tasks** to other users
2. **Accept tasks** assigned to them
3. **Edit task details** (title and description)
4. **Mark tasks as complete** when finished
5. **Approve or reject** completed tasks with feedback
6. **Reassign tasks** to different users
7. **Delete tasks** when no longer needed

### How to Test the Task Management Feature

1. **Start the backend server**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the frontend development server**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Register two users** (or use existing accounts)
   - One user will be the task assigner
   - The other user will be the task receiver

4. **Login as the assigner**:
   - Navigate to the Tasks page from the navbar
   - Click "Create Task"
   - Fill in the task details and select the receiver
   - Submit the form

5. **Login as the receiver**:
   - Navigate to the Tasks page
   - You should see the assigned task
   - Click "Accept" to start working on it
   - After completing the work, click "Mark Complete"

6. **Login as the assigner again**:
   - Navigate to the Tasks page
   - Find the completed task
   - Click "View Details"
   - Click "Review" to approve or reject the task
   - Add remarks if needed

7. **Additional actions to test**:
   - Edit task details
   - Reassign the task to another user
   - Delete a task

## API Endpoints

### Task Management

| Method | Endpoint                  | Description                   | Access         |
|--------|---------------------------|-------------------------------|----------------|
| POST   | /api/v1/tasks             | Create and assign a new task  | Any user       |
| GET    | /api/v1/tasks             | Get all tasks for current user| Any user       |
| GET    | /api/v1/tasks/:id         | Get a specific task by ID     | Task assigner/receiver |
| PUT    | /api/v1/tasks/:id         | Edit a task                   | Task assigner  |
| DELETE | /api/v1/tasks/:id         | Delete a task                 | Task assigner  |
| PATCH  | /api/v1/tasks/:id/accept  | Accept a task                 | Task receiver  |
| PATCH  | /api/v1/tasks/:id/complete| Mark a task as complete       | Task receiver  |
| PATCH  | /api/v1/tasks/:id/approve | Approve/reject a task         | Task assigner  |
| PATCH  | /api/v1/tasks/:id/reassign| Reassign a task               | Task assigner  | 