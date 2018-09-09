package pl.piomin.services.boot.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.piomin.services.boot.model.Debt;
import pl.piomin.services.boot.model.Status;

import java.util.List;

public interface DebtRepository extends MongoRepository<Debt, String> {
	public List<Debt> findByStatusAndDebtSideId(Status status, Integer id);
	public List<Debt> findAll();
	public List<Debt> findByDebtSideId(String id);
}
