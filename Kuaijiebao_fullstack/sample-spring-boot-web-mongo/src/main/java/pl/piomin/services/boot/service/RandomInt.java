package pl.piomin.services.boot.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Locale;
import java.util.Objects;
import java.util.Random;

@Service
public class RandomInt {

    //
    //SIMPLE random int generator
    public Integer getRandomInt(){
        Random random = new Random();

        //between 100000 and 999999
        int x = random.nextInt(9000000) + 100000;
        return x;
    }

}