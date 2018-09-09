package pl.piomin.services.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@Document(collection = "fpdeal")
public class FPDeal {

	@Id
	private String id;
	private Integer userId;
	private String fpId;

	public FPDeal(String id, Integer userId, String fpId){

		this.id = id;
		this.userId = userId;
		this.fpId = fpId;
	}
}
