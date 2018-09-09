package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.piomin.services.boot.model.AssetFlow;

import java.time.LocalDateTime;
import java.util.List;

public interface AfRepository extends MongoRepository<AssetFlow, String> {
	public List<AssetFlow> findByUserId(Integer id);
	public List<AssetFlow> findByUserIdAndDateBetween(Integer id, LocalDateTime start, LocalDateTime end);
}
