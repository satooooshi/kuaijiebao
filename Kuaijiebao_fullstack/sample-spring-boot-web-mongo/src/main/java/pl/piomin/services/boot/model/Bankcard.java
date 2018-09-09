package pl.piomin.services.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@Document(collection = "bankcard")
public class Bankcard {

	@Id
	private String id;
	private Integer userId;
	private String cardNum;
	private String name;
	private String cvc;
	private String expiry;
	private LocalDateTime addedDate;

	public Bankcard(){}

	public Bankcard(String id, Integer userId, String cardNum, String name,
					String cvc, String expiry, LocalDateTime addedDate){
		this.id = id;
		this.userId = userId;
		this.cardNum = cardNum;
		this.name = name;
		this.cvc = cvc;
		this.expiry = expiry;
		this.addedDate = addedDate;
	}
}
