package pl.piomin.services.boot.controller;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.piomin.services.boot.Application;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.data.QuestionRepository;
import pl.piomin.services.boot.model.AssetFlow;
import pl.piomin.services.boot.model.Question;

import java.io.IOException;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
public class QuestionControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private QuestionRepository repository;

    @After
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void givenValidQuestion_whenFindAll_thenStatus200() throws IOException, Exception {
        Question q=new Question();
        q.setId("222");
        mvc.perform(get("/question").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidQuestion_whenFindByKeyword_thenStatus200() throws IOException, Exception {
        Question q=new Question();
        q.setId("222");
        q.setTitle("title");
        q.setAnswer("answer");
        mvc.perform(get("/question?keyword="+"title").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }




}