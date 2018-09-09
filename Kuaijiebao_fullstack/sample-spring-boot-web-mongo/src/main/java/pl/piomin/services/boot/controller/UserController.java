package pl.piomin.services.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.piomin.services.boot.RandomString;
import pl.piomin.services.boot.data.CalenderUserRepository;
import pl.piomin.services.boot.data.BankcardRepository;
import pl.piomin.services.boot.data.UserSpecRepository;
import pl.piomin.services.boot.model.*;
import pl.piomin.services.boot.payload.ApplyLoanForm;
import pl.piomin.services.boot.payload.BalanceAddForm;
import pl.piomin.services.boot.payload.SigninForm;
import pl.piomin.services.boot.payload.SignupForm;
import pl.piomin.services.boot.service.RandomInt;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import static pl.piomin.services.boot.model.Status.SUBMITTED;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private CalenderUserRepository repository;

	@Autowired
	UserSpecRepository userSpecRepository;

	@Autowired
	private BankcardRepository bcRepository;

	@Autowired
	RandomString genStr;

	@Autowired
	RandomInt genInt;



	@GetMapping
	public List<CalendarUser> findAll() {
		return repository.findAll();
	}

	@GetMapping("/{id}")
	public CalendarUser findById(@PathVariable("id") Integer id) {
		return repository.findById(id);
	}

	@PostMapping("/signin")
	public CalendarUser signIn(@RequestBody SigninForm form) {
		return repository.findByEmailAndPassword(form.getEmail(),form.getPassword());
	}

	@PostMapping("/signup")
	public CalendarUser signUp(@RequestBody SignupForm form) {
		CalendarUser user=new CalendarUser();
		user.setId(genInt.getRandomInt());
		user.setEmail(form.getEmail());
		user.setFirstName(form.getFirstName());
		user.setLastName(form.getLastName());
		user.setPassword(form.getPassword());

		Bankcard card=new Bankcard();
		card.setId(genStr.nextString());
		card.setUserId(user.getId());
		card.setCardNum(form.getCardNum());
		card.setName(form.getName());
		card.setCvc(form.getCvc());
		card.setExpiry(form.getExpiry());
		LocalDateTime now = LocalDateTime.now();
		card.setAddedDate(now);
		bcRepository.save(card);
		return repository.save(user);
	}

	@GetMapping("/password/{userId}/{password}")
	public CalendarUser changePassword(@PathVariable("userId") Integer userId, @PathVariable("password") String password) {
		CalendarUser user=repository.findById(userId);
		user.setPassword(password);
		repository.save(user);
		return user;
	}

	@GetMapping("/bankcard/{userId}")
	public List<Bankcard> getUserBankcard(@PathVariable Integer userId) {
		return bcRepository.findByUserId(userId);
	}

	@PostMapping("/bankcard/{userId}")
	public Bankcard addUserBankCard(@RequestBody Bankcard form,@PathVariable Integer userId) {
		Bankcard card=new Bankcard();
		card.setId(genStr.nextString());
		card.setUserId(userId);
		card.setCardNum(form.getCardNum());
		card.setName(form.getName());
		card.setCvc(form.getCvc());
		card.setExpiry(form.getExpiry());
		LocalDateTime now = LocalDateTime.now();
		card.setAddedDate(now);
		return bcRepository.save(card);
	}

	@DeleteMapping("/bankcard/{id}")
	public void removeUserBankCard(@PathVariable String id) {
		bcRepository.deleteById(id);
	}

	@PostMapping("/spec")
	public UserSpec addUserSpec(@RequestBody UserSpec form) {
		UserSpec spec=new UserSpec();
		spec.setId(genStr.nextString());
		spec.setUserId(form.getUserId());
		spec.setAddress(form.getAddress());
		spec.setBalance(form.getBalance());
		spec.setAge(form.getAge());
		spec.setIncome(form.getIncome());
		spec.setWork(form.getWork());
		spec.setDescription(form.getDescription());
		return userSpecRepository.save(spec);
	}

	@GetMapping("/spec/{userId}")
	public UserSpec findUserSpecByUserId(@PathVariable("userId") Integer userId) {
		return userSpecRepository.findByUserId(userId);
	}

	@PutMapping("/spec")
	public UserSpec updateUserSpec(@RequestBody UserSpec form) {
		UserSpec spec=new UserSpec();
		spec.setId(genStr.nextString());
		spec.setUserId(form.getUserId());
		spec.setAddress(form.getAddress());
		spec.setBalance(form.getBalance());
		spec.setAge(form.getAge());
		spec.setIncome(form.getIncome());
		spec.setWork(form.getWork());
		spec.setDescription(form.getDescription());
		return userSpecRepository.save(spec);
	}

	@GetMapping("/balance/{id}")
	public UserSpec getUserBalance(@PathVariable Integer id){
		UserSpec spec=userSpecRepository.findByUserId(id);
		return spec;
	}

	@PostMapping("/balance")
	public UserSpec addUserBalance(@RequestBody BalanceAddForm form){
		//Bankcard card=bcRepository.findOne(form.getCardId());
		/*
		reduce card money
		 */
		UserSpec spec=userSpecRepository.findByUserId(form.getUserId());
		spec.setBalance(spec.getBalance()+form.getBalance());

		return userSpecRepository.save(spec);
	}

}