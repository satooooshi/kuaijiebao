package pl.piomin.services.boot.payload;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;



@Data
@NoArgsConstructor
public class SignupForm {

    //@NotEmpty(message="First Name is required")
    private String firstName;
    //@NotEmpty(message="Last Name is required")
    private String lastName;
    //@Email(message="Please provide a valid email address")
    //@NotEmpty(message="Email is required")
    private String email;
    //@NotEmpty(message="Password is required")
    private String password;

    private String address1;
    private String address2;
    private String city;
    private String zip;
    private String state;
    private String country;

    private String name;//On Bankcard
    private String expiry;
    private String cvc;
    private String cardNum;

    public SignupForm(String firstName, String lastName,
                       String email, String password,
                       String address1, String address2,
                       String city, String zip,
                       String state, String country,
                       String name, String expiry,
                       String cvc, String cardNum){

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zip = zip;
        this.state = state;
        this.country = country;
        this.name = name;
        this.expiry = expiry;
        this.cvc = cvc;
        this.cardNum = cardNum;
    }


   /*
    public String getEmail() {
        return email;
    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
*/
}
