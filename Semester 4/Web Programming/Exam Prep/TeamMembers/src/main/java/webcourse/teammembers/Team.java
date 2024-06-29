package webcourse.teammembers;

public class Team {
    int id;
    String name;
    String homeCity;

    public Team(int id, String name, String homeCity) {
        this.id = id;
        this.name = name;
        this.homeCity = homeCity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHomeCity() {
        return homeCity;
    }

    public void setHomeCity(String homeCity) {
        this.homeCity = homeCity;
    }
}
