package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.piomin.services.boot.model.CalendarUser;

import java.util.List;

public interface CalenderUserRepository extends MongoRepository<CalendarUser, String> {
	public CalendarUser findById(Integer id);
	public CalendarUser findByEmailAndPassword(String email, String password);

}
