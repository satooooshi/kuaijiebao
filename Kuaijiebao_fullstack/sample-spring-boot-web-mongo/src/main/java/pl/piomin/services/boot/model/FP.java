package pl.piomin.services.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@Document(collection = "fp")
public class FP {

	@Id
	private String id;
	private String name;
	private double rate;
	private int period;
	private String transitionId;
	private float minPrice;
	private String risk;
	private LocalDateTime buyDue;
	private String productor;
	private LocalDateTime addedTime;
	private String description;

	public FP(String id,String name,double rate,int period,
			  String transitionId,float minPrice,
			  String risk,LocalDateTime buyDue,
			  String productor,LocalDateTime addedTime,
			  String description){

		this.id = id;
		this.name = name;
		this.rate = rate;
		this.period = period;
		this.transitionId = transitionId;
		this.minPrice = minPrice;
		this.risk = risk;
		this.buyDue = buyDue;
		this.productor = productor;
		this.addedTime = addedTime;
		this.description = description;
	}

}
