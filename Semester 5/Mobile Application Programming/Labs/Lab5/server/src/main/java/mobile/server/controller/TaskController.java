package mobile.server.controller;


import mobile.server.dto.TaskDTO;
import mobile.server.model.Task;
import mobile.server.service.TaskService;
import mobile.server.websocket.TaskWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService service;
    private final TaskWebSocketHandler webSocketHandler;

    public TaskController(TaskService service, TaskWebSocketHandler webSocketHandler) {
        this.service = service;
        this.webSocketHandler = webSocketHandler;
    }

    /**
     * Corresponds to:
     * @GET("/tasks")
     * fun getTasks() : Call<List<Task>>
     */
    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        try {
            logger.info("Fetching all tasks");
            List<Task> tasks = service.getAllTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("Error fetching tasks: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Corresponds to:
     * @GET("/tasks/details")
     * fun getTask(@Query("id") id: Int) : Call<Task>
     */
    @GetMapping("/details")
    public ResponseEntity<Task> getTask(@RequestParam("id") int id) {
        try {
            logger.info("Fetching task with ID: {}", id);
            return service.getTaskById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        logger.warn("Task with ID {} not found", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error fetching task with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Corresponds to:
     * @POST("/tasks/create")
     * fun createTask(@Body task: Task) : Call<Task>
     */
    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            logger.info("Creating a new task: {}", task.getTitle());
            Task createdTask = service.createTask(task);
            webSocketHandler.notifyTaskChange("Task created");
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            logger.error("Error creating task: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Corresponds to:
     * @PUT("/tasks/update")
     * fun updateTask(@Body task: Task) : Call<Task>
     */
    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        try {
            logger.info("Updating task with ID: {}", task.getTaskId());
            // Ensure the task exists
            Task existingTask = service.getTaskById(task.getTaskId())
                    .orElseThrow(() -> new IllegalArgumentException("Task not found"));

            // Update the task in the database (you could merge fields if needed)
            Task updatedTask = service.updateTask(task);

            webSocketHandler.notifyTaskChange("Task updated");
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            logger.error("Error updating task with ID {}: {}", task.getTaskId(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Corresponds to:
     * @DELETE("/tasks/delete")
     * fun deleteTask(@Query("id") id: Int) : Call<Void>
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteTask(@RequestParam("id") int id) {
        try {
            logger.info("Deleting task with ID: {}", id);
            service.deleteTask(id);
            webSocketHandler.notifyTaskChange("Task deleted");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting task with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

