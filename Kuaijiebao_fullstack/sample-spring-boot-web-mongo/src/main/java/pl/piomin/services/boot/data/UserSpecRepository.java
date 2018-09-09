package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.piomin.services.boot.model.UserSpec;

import java.util.List;

public interface UserSpecRepository extends MongoRepository<UserSpec, String> {
	public UserSpec findByUserId(Integer id);
}
