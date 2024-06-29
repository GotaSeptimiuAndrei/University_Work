package main;

public class Content {
    private Integer contentId;
    private Integer creatorId;
    private String title;
    private String description;
    private String url;

    public Content(Integer contentId, Integer creatorId,String title, String description, String url) {
        this.contentId = contentId;
        this.creatorId = creatorId;
        this.title = title;
        this.description = description;
        this.url = url;
    }

    public Integer getContentId() {
        return contentId;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }
}
