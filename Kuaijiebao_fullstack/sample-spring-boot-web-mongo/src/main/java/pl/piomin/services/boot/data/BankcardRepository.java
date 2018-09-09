package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.piomin.services.boot.model.Bankcard;

import java.util.List;

public interface BankcardRepository extends MongoRepository<Bankcard, String> {
	public List<Bankcard> findByUserId(Integer id);
	public void deleteById(String id);
}
