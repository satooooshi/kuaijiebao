package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.piomin.services.boot.model.Question;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {

	public List<Question>findByTitleIgnoreCaseContainingOrAnswerIgnoreCaseContaining(String title, String answer);
	public List<Question> findByTitleLike(String keyword);
	public List<Question> findAll();
	
}
