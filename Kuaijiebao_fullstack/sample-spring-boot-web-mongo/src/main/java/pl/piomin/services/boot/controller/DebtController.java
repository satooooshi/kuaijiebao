package pl.piomin.services.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.piomin.services.boot.RandomString;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.data.BankcardRepository;
import pl.piomin.services.boot.data.DebtRepository;
import pl.piomin.services.boot.data.UserSpecRepository;
import pl.piomin.services.boot.model.*;
import pl.piomin.services.boot.payload.ApplyLoanForm;
import pl.piomin.services.boot.service.RandomInt;

import java.time.LocalDateTime;
import java.util.List;

import static pl.piomin.services.boot.model.Status.*;

@CrossOrigin
@RestController
@RequestMapping("/debt")
public class DebtController {
	
	@Autowired
	private DebtRepository repository;

	@Autowired
	private AfRepository afRepository;

	@Autowired
	private BankcardRepository bcRepository;

	@Autowired
	private UserSpecRepository userSpecRepository;

	@Autowired
	RandomString genStr;

	@Autowired
	RandomInt genInt;

	@GetMapping("/")
	public List<Debt> findAll(){
		return repository.findAll();
	}

	@GetMapping("/{id}")
	public Debt findById(@PathVariable("id") String id) {
		return repository.findOne(id);
	}


	@GetMapping("/debtSide/{id}")
	public List<Debt> findByDebtSideId(@PathVariable("id") String id) {
		return repository.findByDebtSideId(id);
	}

	@GetMapping("/status")
	public List<Debt> findByStatusAndDebtSideId(@RequestParam("status") Status status, @RequestParam("id") Integer id) {
		return repository.findByStatusAndDebtSideId(status,id);
	}

	@GetMapping("/accepted/{id}")
	public List<Debt> findAcceptedOfUserId(@PathVariable("id") Integer id) {
		return repository.findByStatusAndDebtSideId(ACCEPTED,id);
	}

	@GetMapping("/exceptaccepted/{id}")
	public List<Debt> findExceptAcceptedOfUserId(@PathVariable("id") Integer id) {
		List<Debt> list1 = repository.findByStatusAndDebtSideId(REJECTED,id);
		List<Debt> list2= repository.findByStatusAndDebtSideId(OVERDUED,id);
		List<Debt> list3 = repository.findByStatusAndDebtSideId(PENDING,id);
		List<Debt> list4 = repository.findByStatusAndDebtSideId(SUBMITTED,id);
		List<Debt> list5 = repository.findByStatusAndDebtSideId(REPAID,id);
		list1.addAll(list2);
		list1.addAll(list3);
		list1.addAll(list4);
		list1.addAll(list5);

		return list1;
	}





	@PostMapping("/apply")
	public Debt apply(@RequestBody ApplyLoanForm form) {
		Debt d = new Debt();
		d.setId(genStr.nextString());
		d.setDebtSideId(form.getDebtSideId());
		d.setLoanAmount(form.getLoanAmount());
		d.setDescription(form.getDescription());
		d.setNumRepayments(form.getNumRepayments());
		if(form.getNumRepayments()<10) {
			d.setRate(0);
		}else{
			d.setRate(18);
		}
		LocalDateTime now = LocalDateTime.now();
		d.setAppliedDate(now);
		d.setStatus(SUBMITTED);
		return repository.save(d);
	}
	/*
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") String id) {
		repository.delete(id);
	}
	
	@PutMapping
	public void update(@RequestBody Debt d) {
		repository.save(d);
	}
*/


	@GetMapping("/accept/{creditSideId}/{id}")
	public Debt acceptDebt(@PathVariable("id") String id, @PathVariable("creditSideId") Integer creditSideId) {
		Debt d=repository.findOne(id);
		System.out.println(d);
		d.setStatus(ACCEPTED);
		LocalDateTime now = LocalDateTime.now();
		d.setAuditedDate(now);
		d.setNextDue(now);
		d.setCreditSideId(creditSideId);
		d.setNextDue(d.getNextDue().plusMonths(1));
		d.setFinalDue(d.getAuditedDate().plusMonths(d.getNumRepayments()));
		d.setAmountRepayments(new Float(d.getLoanAmount()+d.getLoanAmount()*0.01*d.getRate()/365*d.getNumRepayments()));
		d.setAmountPerMonth(d.getAmountRepayments()/d.getNumRepayments());

		UserSpec user=userSpecRepository.findByUserId(d.getDebtSideId());
		user.setBalance(user.getBalance() + d.getLoanAmount());
		AssetFlow flow=new AssetFlow(genStr.nextString(),user.getUserId(),d.getId(),d.getAmountPerMonth(),"IN", now);
		afRepository.save(flow);
		userSpecRepository.save(user);
		return repository.save(d);
	}

	@GetMapping("/repay/{debtSideId}/{id}/{cardId}")
	public Debt repayDebt(@PathVariable("id") String id, @PathVariable("debtSideId") Integer debtSideId, @PathVariable("cardId") String cardId) {
		Debt d=repository.findOne(id);
		if((d.getRepaidNum()+1)!=d.getNumRepayments()) {
			d.setRepaidAmount(d.getRepaidAmount() + d.getAmountPerMonth());
			d.setRepaidNum(d.getRepaidNum() + 1);
			LocalDateTime now = LocalDateTime.now();
			AssetFlow flow=new AssetFlow(genStr.nextString(),debtSideId,d.getId(),d.getAmountPerMonth(),"OUT", now);
			afRepository.save(flow);
			UserSpec user=userSpecRepository.findByUserId(debtSideId);
			user.setBalance(user.getBalance() - d.getAmountPerMonth());
			userSpecRepository.save(user);
		}else{
			LocalDateTime now = LocalDateTime.now();
			d.setRepaidCompDate(now);
			d.setStatus(REPAID);
		}

		return repository.save(d);
	}

}