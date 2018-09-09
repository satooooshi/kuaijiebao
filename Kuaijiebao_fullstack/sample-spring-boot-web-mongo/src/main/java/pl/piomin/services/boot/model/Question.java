package pl.piomin.services.boot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@Document(collection = "question")
public class Question {

	@Id
	private String id;
	private String title;
	private String answer;
	private List<Integer> likes;

	public Question(){};

	public Question(String id, String title, String answer, List<Integer>likes){
		this.id = id;
		this.title = title;
		this.answer = answer;
		this.likes=likes;
	}


}
