package pl.piomin.services.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.piomin.services.boot.data.FpRepository;
import pl.piomin.services.boot.data.FpdealRepository;
import pl.piomin.services.boot.model.FP;
import pl.piomin.services.boot.model.FPDeal;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/fp")
public class FpController {
	
	@Autowired
	private FpRepository repository;

	@Autowired
	private FpdealRepository fpdealRepository;
	
	@GetMapping
	public List<FP> findAll() {
		return repository.findAll();
	}
	
	@GetMapping("/current")
	public List<FP> findByIdOrderByBuyDueAsc(@PathVariable("id") String id) {
		return repository.findAll();
	}

	@GetMapping("/{userId}")
	public List<FPDeal> findByUserId(@PathVariable("userId") Integer userId) {
		return fpdealRepository.findAllByUserId(userId);
	}
	
}
