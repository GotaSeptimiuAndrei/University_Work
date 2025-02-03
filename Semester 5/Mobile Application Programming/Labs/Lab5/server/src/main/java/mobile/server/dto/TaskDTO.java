package mobile.server.dto;

import lombok.Data;

@Data
public class TaskDTO {
    private String title;
    private String priorityLevel;
    private String dateDeadline;
    private String timeDeadline;
    private String description;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getDateDeadline() {
        return dateDeadline;
    }

    public void setDateDeadline(String dateDeadline) {
        this.dateDeadline = dateDeadline;
    }

    public String getTimeDeadline() {
        return timeDeadline;
    }

    public void setTimeDeadline(String timeDeadline) {
        this.timeDeadline = timeDeadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
