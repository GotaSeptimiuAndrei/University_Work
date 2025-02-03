package mobile.server.service;

import mobile.server.model.Task;
import mobile.server.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Optional<Task> getTaskById(Integer id) {
        return repository.findById(id);
    }

    public Task createTask(Task task) {
        return repository.save(task);
    }

    public Task updateTask(Task task) {
        return repository.save(task);
    }

    public void deleteTask(Integer id) {
        repository.deleteById(id);
    }
}
