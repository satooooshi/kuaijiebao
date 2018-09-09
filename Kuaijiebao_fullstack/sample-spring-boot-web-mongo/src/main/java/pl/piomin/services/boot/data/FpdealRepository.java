package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.piomin.services.boot.model.FPDeal;

import java.util.List;

public interface FpdealRepository extends MongoRepository<FPDeal, String> {

	public List<FPDeal> findAll();
	public List<FPDeal> findAllByUserId(Integer id);
	
}
