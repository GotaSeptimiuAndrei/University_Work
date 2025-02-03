# **FocusMate - Task Management App**

FocusMate is a user-friendly mobile app designed to keep you on top of your daily tasks, appointments, and important dates. This intuitive application is your go-to solution for staying organized and never missing an important moment. Whether you're a busy professional, a student juggling assignments, or someone who simply values efficiency, FocusMate is your trusted companion. 


## Domain 
**Entity: Task**

Title: A brief and recognizable name or label for the task. This helps users quickly identify what the task is for.

Description: Additional notes or information related to the task. Users can include any details or instructions they find relevant.

Priority: An indication of how important or urgent the task is. Users can assign priority levels such as "High," "Medium," or "Low" to help them prioritize their tasks effectively.

Date Deadline: The date when the task should be triggered. It specifies the day on which the task is relevant.

Time Deadline: The specific time of day when the task should appear. This ensures that users are alerted at the exact moment they need to remember something.  


## CRUD
**Create**  Operation: Create a new task. 

Details: Users can add a new task by providing a title, description, specifying the date dealine, time deadline, and assigning a priority level. Once all the required information is entered, they can save the task.

**Read**
Operation: View existing tasks.

Details: The default screen contains a list containing the tasks stored in the database. Clicking on a task will allow users to view its full details.

**Update**
Operation: Modify an existing task. 

Details: Users can select a task they wish to update. They can then edit the title, description, date deadline, time deadline, and priority as needed. After making changes, they save the updated information, which overwrites the previous data for that task. 

**Delete**
Operation: Delete an existing task.

Details: Users can press on the delete button which is present next to every task. Once they press the button, a confirmation pop-up will appear. 


## Storing Data
Dual Persistence for Data: Data persistence is crucial for a seamless user experience. Therefore, FocusMate has been designed to be connected to both a local database and a server, allowing users to access their tasks both online and offline. This ensures that your tasks are always available when you need them. 

Bi-Directional Data Changes: When users create, update, or delete tasks, these changes are stored both on the server and in the local database. This means that the information is always synchronized.

Online Updates: When users are online, the app fetches task data directly from the server. This ensures that any updates or modifications to tasks are reflected immediately, providing a real-time experience. 


## Offline Mode
**Creation of Tasks** 

When offline, any newly created tasks are saved locally in the device's database. However, they are not immediately synchronised with the server. 

**Reading Tasks**

When offline, the app retrieves and displays tasks from the local database while also displaying a message that states that the server connection is down.
 
**Updating Tasks**

When offline, any updated tasks are saved locally in the device's database. However, they are not immediately synchronised with the server.
 
**Deletion of Tasks**

When offline, any deleted tasks will be deleted from the database locally. However, they are not immediately synchronised with the server.

 
**When the application goes back online, all the changes on the local database are transmitted to the server.**

## Screenshots
<p align="center"> <img src="https://github.com/ma-cs-ubbcluj-ro/crud-project-GotaSeptimiuAndrei/blob/master/idea/screenshots/p1.png" height="500"/> </p>
<p align="center"> <img src="https://github.com/ma-cs-ubbcluj-ro/crud-project-GotaSeptimiuAndrei/blob/master/idea/screenshots/p2.png" height="500"/> </p>



