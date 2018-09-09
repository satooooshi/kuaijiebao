package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.piomin.services.boot.model.FP;

import java.util.List;

public interface FpRepository extends MongoRepository<FP, String> {

	public List<FP> findAll();
	
}
