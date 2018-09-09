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
@Document(collection = "assetflow")
public class AssetFlow {

	@Id
	private String id;
	private Integer userId;
	private String tscId;
	private float amount;
	private String inout;
	private LocalDateTime date;

	public AssetFlow(){};

	public AssetFlow(String id, Integer userId, String tscId, float amount, String inout, LocalDateTime date){
		this.id = id;
		this.userId = userId;
		this.tscId = tscId;
		this.amount = amount;
		this.inout = inout;
		this.date = date;
	}

}
