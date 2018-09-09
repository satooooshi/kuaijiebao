package pl.piomin.services.boot.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BalanceAddForm {



    @NotEmpty(message="userId is required")
    private Integer userId;
    @NotEmpty(message="balance is required")
    private float balance;
    @NotEmpty(message="cardId is required")
    private String cardId;
}
