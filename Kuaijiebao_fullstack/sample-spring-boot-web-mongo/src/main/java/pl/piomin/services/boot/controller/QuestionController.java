package pl.piomin.services.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.piomin.services.boot.data.QuestionRepository;
import pl.piomin.services.boot.model.Question;
import pl.piomin.services.boot.service.PersonCounterService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/question")
public class QuestionController {
	
	@Autowired
	private QuestionRepository repository;
	
	@GetMapping
	public List<Question> findAll() {
		return repository.findAll();
	}

	/*
	@GetMapping("/{id}")
	public Question findById(@PathVariable("id") String id) {
		return repository.findOne(id);
	}
	*/
	@GetMapping("/search")
	public List<Question> findByKeyword(@RequestParam("keyword") String keyword) {
		return repository.findByTitleIgnoreCaseContainingOrAnswerIgnoreCaseContaining(keyword,keyword);
	}

	/*
	@PostMapping
	public Question add(@RequestBody Question p) {
		p = repository.save(p);
		return p;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") String id) {
		repository.delete(id);
	}


	@PutMapping
	public void update(@RequestBody Question q) {
		repository.save(q);
	}
*/
	
}
