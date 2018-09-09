package pl.piomin.services.boot.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import pl.piomin.services.boot.model.Status;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class ApplyLoanForm {



    @NotEmpty(message="debtSideId is required")
    private Integer debtSideId;
    @NotEmpty(message="loanAmount is required")
    private long loanAmount;
    @NotEmpty(message="description is required")
    private String description;
    @NotEmpty(message="numRepayments")
    private int numRepayments;

    public ApplyLoanForm(Integer debtSideId, long loanAmount,
                         String description, int numRepayments){

        this.debtSideId = debtSideId;
        this.loanAmount = loanAmount;
        this.description = description;
        this.numRepayments = numRepayments;
    }
}
