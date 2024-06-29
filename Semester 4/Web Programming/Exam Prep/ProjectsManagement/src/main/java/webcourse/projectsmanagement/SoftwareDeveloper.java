package webcourse.projectsmanagement;

public class SoftwareDeveloper {
    private int id;
    private String name;
    private int age;
    private String skills;

    public SoftwareDeveloper(int id, String name, int age, String skills) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.skills = skills;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getSkills() {
        return skills;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }
}
