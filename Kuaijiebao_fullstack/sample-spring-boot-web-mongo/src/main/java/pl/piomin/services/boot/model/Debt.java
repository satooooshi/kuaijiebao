package pl.piomin.services.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import sun.jvm.hotspot.debugger.cdbg.EnumType;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@AllArgsConstructor
@Document(collection = "debt")
public class Debt {

	@Id
	private String id;

	private Integer debtSideId;
	private float loanAmount;
	private String description;
	private int numRepayments;

	private double rate;
	private LocalDateTime appliedDate;
	private Status status;

	//after accepted

	private Integer creditSideId;
	private LocalDateTime auditedDate;
	private float amountPerMonth;
	private LocalDateTime nextDue;
	private LocalDateTime finalDue;
	private float amountRepayments;

	//after paid

	//paid amount and num repaymentfinisheddate
	private float repaidAmount;
	private long repaidNum;
	private LocalDateTime repaidCompDate;

	public Debt(){};


	public Debt(String id, Integer debtSideId, Status status){

		this.id = id;
		this.debtSideId = debtSideId;
		this.status = status;
	}

}
