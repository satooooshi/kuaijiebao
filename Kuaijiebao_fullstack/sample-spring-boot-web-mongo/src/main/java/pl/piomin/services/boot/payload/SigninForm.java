package pl.piomin.services.boot.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;


@Data
@NoArgsConstructor
public class SigninForm {

    private String email;
    private String password;

    public SigninForm(String email, String password){

        this.email = email;
        this.password = password;
    }

}
