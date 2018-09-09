package pl.piomin.services.boot.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userspec")
public class UserSpec {
    @Id
    private String id;
    private Integer userId;
    private String address;
    private String income;
    private String work;
    private String age;
    private String description;
    private float balance;

    public UserSpec(String id,Integer userId,String address,String income,String work,String age,String description,float balance){

        this.id = id;
        this.userId = userId;
        this.address = address;
        this.income = income;
        this.work = work;
        this.age = age;
        this.description = description;
        this.balance = balance;
    }

    public UserSpec(){};
}
