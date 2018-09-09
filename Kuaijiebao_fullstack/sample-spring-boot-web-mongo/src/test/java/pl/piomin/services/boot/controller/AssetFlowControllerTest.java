package pl.piomin.services.boot.controller;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.piomin.services.boot.Application;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.model.AssetFlow;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
public class AssetFlowControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AfRepository repository;

    @After
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void givenValidUserId_whenFindAllByUserId_thenStatus200() throws IOException, Exception {
        AssetFlow flow=new AssetFlow();
        flow.setId("222");
        flow.setUserId(222);
        mvc.perform(get("/assetflow/"+"111").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenFindByUserIdYear_thenStatus200() throws IOException, Exception {
        AssetFlow flow=new AssetFlow();
        flow.setId("222");
        flow.setUserId(222);
        mvc.perform(get("/assetflow/period/year/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenFindByUserIdMonth_thenStatus200() throws IOException, Exception {
        AssetFlow flow=new AssetFlow();
        flow.setId("222");
        flow.setUserId(222);
        mvc.perform(get("/assetflow/period/month/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenFindByUserIdWeek_thenStatus200() throws IOException, Exception {
        AssetFlow flow=new AssetFlow();
        flow.setId("222");
        flow.setUserId(222);
        mvc.perform(get("/assetflow/period/week/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenFindByUserIdDay_thenStatus200() throws IOException, Exception {
        AssetFlow flow=new AssetFlow();
        flow.setId("222");
        flow.setUserId(222);
        mvc.perform(get("/assetflow/period/day/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }




}