package pl.piomin.services.boot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.data.UserSpecRepository;
import pl.piomin.services.boot.model.AssetFlow;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/assetflow")
public class AssetFlowController {

	@Autowired
	AfRepository afRepository;

	@GetMapping("/{userId}")
	public List<AssetFlow> findAllByUserId(@PathVariable("userId") Integer userId) {
		return afRepository.findByUserId(userId);
	}

	@GetMapping("/period/week/{userId}")
	public List<AssetFlow> findByUserIdWeek(@PathVariable("userId") Integer userId) {

		LocalDateTime now = LocalDateTime.now();
		LocalDateTime weekAgo=now.minusWeeks(1);

		return afRepository.findByUserIdAndDateBetween(userId,weekAgo,now);
	}

	@GetMapping("/period/month/{userId}")
	public List<AssetFlow> findByUserIdMonth(@PathVariable("userId") Integer userId) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime monthAgo=now.minusMonths(1);

		//List<AssetFlow>flow=afRepository.findByUserIdAndDateBetween(userId,monthAgo,now);

		return afRepository.findByUserIdAndDateBetween(userId, monthAgo,now);
	}

	@GetMapping("/period/year/{userId}")
	public List<AssetFlow> findByUserIdYear(@PathVariable("userId") Integer userId) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime yearAgo=now.minusYears(1);
		return afRepository.findByUserIdAndDateBetween(userId,yearAgo,now);
	}


	@GetMapping("/period/day/{userId}")
	public float findByUserIdDay(@PathVariable("userId") Integer userId) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime dayAgo=now.minusDays(2);
		List<AssetFlow> flows=afRepository.findByUserIdAndDateBetween(userId,dayAgo,now);
		float sum=0;
		for(int i=0;i<flows.size();i++){
			if(flows.get(i).getInout().equals("IN"))
				sum+=flows.get(i).getAmount();
		}
		return sum;
	}




}
